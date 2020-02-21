$(document).ready(() => {
    $('.header_burger').click(() => {
        $('.header_burger, .header_menu').toggleClass('active');
        $('.content').toggleClass('blur')
    });
    if(!window.location.hash){
        window.location.hash = '#main'
    } else loadData(window.location.hash);

    $(window).click(e => {
        if(e.target === $('.content')[0]) {
            $('.header_burger, .header_menu').removeClass('active');
            $('.content').removeClass('blur')
        }
    })
});

//download content according to the hash
$(window).on('hashchange',() => {
    const URLHash = window.location.hash;
    loadData(URLHash);
    $('.header_burger, .header_menu').removeClass('active');
    $('.content').removeClass('blur')
});

function loadData(URLHash) {
    let url = 'pages/';
    switch(URLHash) {
        case "#game":
            url += "game.html";
            break;
        case "#about":
            url += "about.html";
            break;
        case "#main":
            url += "main.html";
            break;
        default:
            url += 'highscores.html'
    }
    $.ajax(url,
        {
            type:'GET',
            dataType:'html',
            success: dataLoaded,
            error: errorHandler
        }
    )
}

let isLoadedGame = false;
function dataLoaded(data) {
    //loading a game page only once
    const gameContainer = $('#game_container');
    const pageContainer = $('#page_container');
    if(window.location.hash === '#game') {
        pageContainer.css('display', 'none');
        gameContainer.css('display', 'block');
        if(!isLoadedGame) {
            gameContainer.html(data);
            isLoadedGame = true;
            loadGame();
        }
    } else {
        gameContainer.css('display', 'none');
        pageContainer.css('display', 'block');
        pageContainer.html(data);
    }
}

function errorHandler(e) {
    console.log("Error" + e)
}

function loadGame() {
    const scriptNameArray = ['model', 'view', 'controller', 'game'];
    scriptNameArray.forEach(addScript);

    function addScript(name){
        let script = document.createElement('script');
        script.src = `js/${name}.js`;
        script.id = `${name}_script`;
        script.async = false; // to guarantee order
        document.head.appendChild(script);
    }

}

