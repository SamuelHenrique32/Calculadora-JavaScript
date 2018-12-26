class CalcController{                 //possui regras de negocio

    constructor(){                    //chamado automaticamente quando instancia


        this._locale = 'pt-BR';
        //seleciona elementos, amarra elemento à variável
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;              //underline e atributo privado
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        this.setDisplayDateTime();

       setInterval(()=>{               //arrow Function, atualiza a cada 1000ms

           this.setDisplayDateTime();

        }, 1000);

        /*setTimeout(()=>{                                              //executa unica vez, apos 10 segundos
            //para contagem de tempo e data
            clearInterval(interval);
        }, 10000);*/

    }

    initButtonsEvents(){
        //pega todas as tags g filhas de button
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");          //sinal > sao seletores filhos
        //console.log(buttons);
        //para cada botao
        buttons.forEach((btn, index)=>{
            btn.addEventListener('click', e=>{
                console.log(btn.className.baseVal.replace("btn-",""));
            });


        });
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"

        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return  this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return  this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){                //getter method
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){           //setter method
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}