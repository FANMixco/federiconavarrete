(() => {
    const locale = iLang;
    const directory = new URL('../../', document.currentScript.src);
    const get = id => document.getElementById(id);
    const link = get('portfolio-link');
    const portfolio = new URL(link.href);
    portfolio.searchParams.set('lang', locale);
    link.href = portfolio;
    document.documentElement.lang = locale;
    get('speaking-header').hidden = new URLSearchParams(location.search).get('embed') === '1';

    const language = get('speaking-language');
    language.value = locale;
    language.addEventListener('change', () => {
        const url = new URL(location.href);
        url.searchParams.set('lang', language.value);
        location.assign(url);
    });

    async function readJson(path) {
        const response = await fetch(new URL(path, directory));
        if (!response.ok) throw new Error(`HTTP ${response.status} loading ${path}`);
        return response.json();
    }

    async function load() {
        const status = get('event-count');
        let labels;
        try {
            labels = await readJson(`js/i18n/${locale}/speaking.json`);
            document.title = labels.title + ' | Federico Navarrete';
            document.querySelectorAll('[data-text]').forEach(element => {
                element.textContent = labels[element.dataset.text];
            });
            const { events } = await readJson('js/data/speaking-events.json');
            const published = events.filter(event => event.verification === 'verified');
            published.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.name.localeCompare(b.name, locale));
            renderArchive(published, labels);
        } catch (error) {
            status.textContent = labels?.loadError || 'The events archive could not be loaded.';
            console.error(error);
        }
    }

    function renderArchive(events, labels) {
        const category = get('filter-category');
        const year = get('filter-year');
        const role = get('filter-role');
        const status = get('event-count');
        const archive = get('archive-events');

        function options(select, values, names = {}) {
            select.add(new Option(labels.all, ''));
            for (const value of values) select.add(new Option(names[value] || value, value));
        }

        const distinct = key => [...new Set(events.map(event => event[key]).filter(Boolean))];
        options(category, distinct('category').sort((a, b) => labels.categories[a].localeCompare(labels.categories[b], locale)), labels.categories);
        options(role, distinct('role').sort((a, b) => labels.roles[a].localeCompare(labels.roles[b], locale)), labels.roles);
        options(year, [...new Set(events.flatMap(event => event.date ? [event.date.slice(0, 4)] : []))].sort().reverse());
        get('event-filters').hidden = false;
        get('featured-events').replaceChildren(...events.filter(event => event.featured).map(event => card(event, labels)));

        function render() {
            const filtered = events.filter(event => (!category.value || event.category === category.value)
                && (!year.value || event.date?.startsWith(year.value)) && (!role.value || event.role === role.value));
            archive.replaceChildren(...filtered.map(event => card(event, labels, event.featured ? `archive-${event.id}` : event.id)));
            status.textContent = filtered.length ? labels.results.replace('{count}', new Intl.NumberFormat(locale).format(filtered.length)) : labels.noResults;
        }

        [category, year, role].forEach(select => select.addEventListener('change', render));
        render();
    }

    function card(event, labels, id = event.id) {
        function node(tag, text, className) {
            const element = document.createElement(tag);
            if (text) element.textContent = text;
            if (className) element.className = className;
            return element;
        }

        const article = node('article', null, 'event-card');
        article.id = id;
        if (event.speaking) article.dataset.speaking = '';
        article.append(node('p', `${labels.roles[event.role]} · ${labels.categories[event.category]}`, 'event-type'));

        if (event.image) {
            const image = node('img');
            image.src = new URL(event.image.path, directory);
            image.alt = event.image.alt?.[locale] || labels.imageAlt.replace('{name}', event.name);
            image.loading = 'lazy';
            image.decoding = 'async';
            article.append(image);
        }

        const heading = node('h3', event.presentationTitle || event.name);
        if (event.titleLanguage) heading.lang = event.titleLanguage;
        article.append(heading);
        const date = event.date ? new Intl.DateTimeFormat(locale, {
            year: 'numeric', ...(event.date.length > 4 && { month: 'long' }),
            ...(event.date.length > 7 && { day: 'numeric' }), timeZone: 'UTC'
        }).format(new Date(event.date)) : '';
        const country = event.country && new Intl.DisplayNames([locale], {type: 'region'}).of(event.country);
        const location = [event.location, country].filter(Boolean).join(', ');
        const meta = [...new Set([event.presentationTitle && event.name, event.organizer, date, location].filter(Boolean))];
        if (meta.length) article.append(node('p', meta.join(' · '), 'event-meta'));
        if (event.description?.[locale]) article.append(node('p', event.description[locale]));

        const links = node('p', null, 'event-sources');
        for (const [url, label] of [[event.evidenceUrl, labels.viewSource], [event.videoUrl, labels.watch]]) {
            if (!url) continue;
            const source = node('a', label);
            source.href = url;
            source.setAttribute('aria-label', `${label} — ${event.presentationTitle || event.name}`);
            links.append(source);
        }
        article.append(links);
        return article;
    }

    load();
})();
