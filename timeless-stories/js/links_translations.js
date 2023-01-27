const links_translations = {
    "en": {
        "prezi": "3OA2BbhRZgysnB22bzdX",
        "book": "https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&amp;preview=inline&amp;linkCode=kpe&amp;ref_=cm_sw_r_kb_dp_MGWEVRFZ3TAK6GK5T8A3",
        "contactUs": {
            "key": "hkz0rsUoNkGpGQYpoPHBzg",
            "form": "4"
        }
    },
    "es": {
        "prezi": "3OA2BbhRZgysnB22bzdX",
        "book": "https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&amp;preview=inline&amp;linkCode=kpe&amp;ref_=cm_sw_r_kb_dp_MGWEVRFZ3TAK6GK5T8A3",
        "contactUs": {
            "key": "hkz0rsUoNkGpGQYpoPHBzg",
            "form": "3"
        }
    },
    "zh": {
        "prezi": "8IwA2B6lYhPwonEWAyi9",
        "book": "https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&amp;preview=inline&amp;linkCode=kpe&amp;ref_=cm_sw_r_kb_dp_MGWEVRFZ3TAK6GK5T8A3",
        "contactUs": {
            "key": "hkz0rsUoNkGpGQYpoPHBzg",
            "form": "4"
        }
    }
};

const validLinks = links_translations[lang];

document.getElementById("bookPreviewFrame").setAttribute("src", `https://prezi.com/p/embed/${validLinks.book}`);
document.getElementById("preziPreviewFrame").setAttribute("src", validLinks.prezi);

$('#mContactUs').on('show.bs.modal', function (e) {
    console.log('opened');

    const cuScriptExist = document.getElementById('cu_script');

    if (!cuScriptExist) {
        const script = document.createElement('script');
        script.src = 'https://www.cognitoforms.com/f/seamless.js';
        script.id = 'cu_script';
        script.dataset.key = validLinks.contactUs.key;
        script.dataset.form = validLinks.contactUs.form;
        document.getElementById('divContactUs').appendChild(script);
    }
});