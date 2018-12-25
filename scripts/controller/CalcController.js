class CalcController{                 //possui regras de negocio

    constructor(){                    //chamado automaticamente quando instancia

        this._displayCalc = "0";      //display dos numeros, se fosse com var seria variavel, assim e atributo
        this._currentDate;              //underline e atributo privado  
        this.initialize();
    }

    initialize(){
        //seleciona elementos, amarra elemento à variável
        let displayCalcEl = document.querySelector("#display");
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        //propriedade liberada com o DOM, pega objeto e coloca informacao dentro (no formato HTML)
        //muda o HTML através de JavaScript
        displayCalcEl.innerHTML = "4567";
        dateEl.innerHTML = "01/05/2018";
        timeEl.innerHTML = "00:00";
    }

    get displayCalc(){                //getter method
        return this._displayCalc;
    }

    set displayCalc(valor){           //setter method
        this._displayCalc = valor;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(valor){
        this._currentDate = valor;
    }
}