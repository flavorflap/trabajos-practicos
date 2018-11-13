$(document).ready(function () {
    console.log("ready!")

    function welcome(){
        $('#welcome').show();
        $('#name-error').hide();
        $('#gameboard').hide();
        $('#ranking').hide();
    }

    welcome();

    const levels = [
        {name: 'FÁCIL', attempts: 18},
        {name:'INTERMEDIO', attempts: 14},
        {name: 'EXPERTO', attempts: 12}
    ];

    var users =[]
    const userData = {
        name: '',
        level: '',
        attempts: 0,
    }

    function memotest(level){
        $('#q-attempts').html(level.attempts);
        $('#q-attempts').css("color", "dodgerblue");
         $('#level').html(level.name);
    

        var clicks = 0;
        var attempts = 0;
        var twoCards = [];
        var matches = 0;
    

        $('.card-front').on('click', function(){

            if (clicks <= (level.attempts * 2)){
                clicks++;
                $(this).css('opacity', '1')

                twoCards.push($(this))
                console.log('click', twoCards)
                if (twoCards.length === 2) {
                    attempts++ ;
                    console.log('segundo if', twoCards)
                    if (twoCards[0].data('name') === twoCards[1].data('name')) {
                        twoCards[0].addClass('gris');
                        twoCards[1].addClass('gris');
                        console.log('tercer if', twoCards)
                        matches++;
                        console.log(matches)
                        twoCards = [];
                    }
                    else {
                        setTimeout(function(){ 
                            twoCards[0].css('opacity','0');
                            twoCards[1].css('opacity','0'); 
                            twoCards = []
                        },500)
                    }   
                }
                if (matches === 6) {
                    $('.modal').toggleClass('show-modal');
                    $('#ranking').show();
                    $('.attempts-used').text(attempts);
                    users.push(userData)
                    console.log("users", users, "user Data", userData)
                }
            
            }
            else {
                $('.modal').toggleClass('show-modal');
                $('#ranking').show();
                userData.attempts = attempts;
                users.push(userData)
                console.log("users", users, "user Data", userData)
            }

            $('.attempts-used').text(attempts);


        })
        

    };

    $('.level-button.facil').on('click', function(){
        var name = $('#name').val();
        userData.name = name;
        userData.level = levels[0].name;

        if (name != ''){
            $('#welcome').hide();
        }
        else{
            $('#name-error').show();
            return;
        }

        gameboard();

        $('#gameboard').show(); 
        $('#greeting').html(name);
        
        memotest(levels[0]);
    });

    $('.level-button.intermedio').on('click', function(){
        var name = $('#name').val();
        userData.name = name;
        userData.level = levels[1].name;

        if (name != ''){
            $('#welcome').hide();
        }
        else{
            $('#name-error').show();
            return;
        }

        gameboard();

        $('#gameboard').show(); 
        $('#greeting').html(name);
        
        memotest(levels[1]);
    });

    $('.level-button.experto').on('click', function(){
        var name = $('#name').val();
        userData.name = name;
        userData.level = levels[2].name

        if (name != ''){
            $('#welcome').hide();
        }
        else{
            $('#name-error').show();
            return;
        }

        gameboard();

        $('#gameboard').show(); 
        $('#greeting').html(name);
        
        memotest(levels[2]);
    });


    var cardBackImage = {
        name: 'tapada',
        image: 'img/tapada.jpg'
    };
    var cardStack = [
        {id: 1, name: 'alce', image: 'img/alce.jpg'},
        {id: 2, name: 'alce', image: 'img/alce.jpg'},
        {id: 3, name: 'epelante', image: 'img/epelante.jpg'},
        {id: 4, name: 'epelante', image: 'img/epelante.jpg'},
        {id: 5, name: 'nena', image: 'img/nena.jpg'},
        {id: 6, name: 'nena', image: 'img/nena.jpg'},
        {id: 7, name: 'peces', image: 'img/peces.jpg'},
        {id: 8, name: 'peces', image: 'img/peces.jpg'},
        {id: 9, name: 'unichancho', image: 'img/unichancho.jpg'},
        {id: 10, name: 'unichancho', image: 'img/unichancho.jpg'},
        {id: 11, name: 'zapas', image: 'img/zapas.jpg'},
        {id: 12, name: 'zapas', image: 'img/zapas.jpg'}
    ];

    function gameboard() {
        var cardsContainer = $('#cards-container');
        $('.attempts-used').text('');

        cardStack.sort(function(a,b){
            return Math.random()-Math.random();
        });

        for (let i = 0; i < cardStack.length; i++ ){
            var card = $("<div class='card'></div>");
            var cardBack = $("<div class='card-back '></div>");
            var cardFront = $("<div class='card-front '></div>");
            var imgCardBack = "<image class= 'img-back' src=" + cardBackImage.image + "></image>";
            var imgCardFront = "<image class= 'img-front' src=" + cardStack[i].image + ">";

            cardsContainer.append(card);
            card.append(cardBack);
            card.append(cardFront);
            cardBack.append(imgCardBack);
            cardFront.append(imgCardFront);
            
            cardFront.data('name', cardStack[i].name);
            
        }

    }

    $('.play-again').on('click', function(){
        $('.modal').toggleClass('show-modal');
        $('.card').remove();
        welcome();
    });

});



