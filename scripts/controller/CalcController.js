class CalcController{                 //possui regras de negocio

    constructor(){                    //chamado automaticamente quando instancia

        this._displayCalc = "0";      //display dos numeros, se fosse com var seria variavel, assim e atributo
        this._dataAtual;              //underline e atributo privado  
    }

    get displayCalc(){                //getter method
        return this._displayCalc;
    }

    set displayCalc(valor){           //setter method
        this._displayCalc = valor;
    }

    get dataAtual(){
        return this._dataAtual;
    }

    set dataAtual(valor){
        this._dataAtual = valor;
    }
}