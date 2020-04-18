(function(){
    let startBtn = $('.startBtn');
    let mainInput = $('.main-input');
    let allLines = $('.line');
    let allText = [];
    let score = 0;
    let displayResult = $('.display-result');

    startBtn.on('click', startGame);

    function startGame() {
        $(this).css('visibility', 'hidden');
        mainInput.focus();

        //game setup
        let speed = 1;
        let textLength = 3;
        let typingWords = words.filter(word => word.length == textLength);
        let lvl = 6;

        let speedUp = setInterval(function(){
            textLength++;
            typingWords = words.filter(word => word.length == textLength);
        }, 20000);

        mainInput.on('keyup', checkInputTyping);
        function checkInputTyping(){
            let inputVal = $(this).val();
            let self = $(this);
            if(allText.includes(inputVal)){
                let index = allText.indexOf(inputVal);
                allText.splice(index, 1);
                $('span').filter(function(){
                    return $(this).text() == inputVal;
                }).css('background','blue').fadeOut(100, function(){
                    $(this).remove();
                });
                self.val("");
                score++;
                displayResult.html(score);
            }
        }

        //insert word spans
        function insertSpans() {
            for(var i = 0; i < allLines.length; i++){
                let rand = Math.floor(Math.random()*20);
                if(rand <= lvl){
                    let text = chooseText();
                    allText.push(text);
                    $(allLines[i]).append(`<span>${text}</span>`);
                }
            }
            let insertSpansTimeOut = setTimeout(insertSpans, 7000);
        }
        insertSpans();

        function chooseText(){
            let rand = Math.floor(Math.random() * typingWords.length);
            let savedText = typingWords[rand]; 
            typingWords.splice(rand, 1);
            return savedText;
        }

        //animacija span-ova
        let moveAll = setInterval(function(){
            let allSpans = $('span');
            allSpans.css({
                left: '+='+speed
            });
            //testiranje prelaza linije
            //.each je u jquery foreach petlja gde se za svaki element prvog param izvrsi
            //funkcija koja je drugi param
            $.each(allSpans, (index, el) => {
                //position varijabla uzima vrednost leve ivice elementa
                let position = $(el).position().left;
                if(position > 850){
                    clearAllIntervals();
                    startBtn.css('visibility', 'visible');
                }else if(position > 700 && position < 710){
                    $(el).addClass('danger');
                }
            });
        }, 10);

        //ova funkcija stopira interval koji smo spakovali u varijablu moveAll
        function clearAllIntervals(){
            clearInterval(moveAll);
            clearInterval(speedUp);
            clearTimeout(insertSpansTimeOut);
        }
    }
})();