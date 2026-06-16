(function () {
    // ===== Helpers =====
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    // ===== Script params (type=) =====
    var script = document.currentScript;
    var params = new URLSearchParams(script && script.src.split("?")[1] || "");
    var eventType = params.get("type") || "VturbUndefined";

    // ===== Base =====
    var baseUrl = "https://primary-production-2fb2.up.railway.app/webhook/vturb";
    var urlAtual = new URL(window.location.href);
    var searchParams = new URLSearchParams(urlAtual.search);

    var clickIdValue = null;

    // ===== 1️⃣ URL =====
    if (searchParams.has("cid")) {
        clickIdValue = searchParams.get("cid");
    } else if (searchParams.has("clickid")) {
        clickIdValue = searchParams.get("clickid");
    } else if (searchParams.has("rtkcid")) {
        clickIdValue = searchParams.get("rtkcid");
    } else if (searchParams.has("subid")) {
        clickIdValue = searchParams.get("subid");
    }

    // ===== 2️⃣ Cookie =====
    if (!clickIdValue) {
        clickIdValue = getCookie("rtkclickid-store");
    }

    // ===== 3️⃣ localStorage =====
    if (!clickIdValue) {
        try {
            clickIdValue = localStorage.getItem("rtkclickid-store");
        } catch (e) {}
    }

    // ===== Params finais =====
    var finalParams = new URLSearchParams(searchParams);

    if (clickIdValue) {
        finalParams.set("clickid", clickIdValue);
    }

    finalParams.set("type", eventType);

    var urlComParametros = new URL(baseUrl);
    urlComParametros.search = finalParams.toString();

    // ===== Fire =====
    var img = new Image();
    img.src = urlComParametros.href;

})();
