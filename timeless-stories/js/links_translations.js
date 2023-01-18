const links_translations = {
    "en": {
        "prezi": "https://prezi.com/p/embed/3OA2BbhRZgysnB22bzdX/",
        "book": "https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&amp;preview=inline&amp;linkCode=kpe&amp;ref_=cm_sw_r_kb_dp_MGWEVRFZ3TAK6GK5T8A3"
    },
    "es": {
        "prezi": "https://prezi.com/p/embed/3OA2BbhRZgysnB22bzdX/",
        "book": "https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&amp;preview=inline&amp;linkCode=kpe&amp;ref_=cm_sw_r_kb_dp_MGWEVRFZ3TAK6GK5T8A3"
    },
    "zh": {
        "prezi": "https://prezi.com/view/8IwA2B6lYhPwonEWAyi9/",
        "book": "https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&amp;preview=inline&amp;linkCode=kpe&amp;ref_=cm_sw_r_kb_dp_MGWEVRFZ3TAK6GK5T8A3"
    }
};

const validLinks = links_translations[lang];

document.getElementById("bookPreviewFrame").setAttribute("src", validLinks.book);
document.getElementById("preziPreviewFrame").setAttribute("src", validLinks.prezi);