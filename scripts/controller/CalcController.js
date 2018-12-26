class CalcController{                 //possui regras de negocio

    constructor(){                    //chamado automaticamente quando instancia

        this._operation = [];         //atualiza ao clicar
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

    //adicionar varios eventos em um elemento
    addEventListenerAll(element, events, fn){
        //percorre cada evento
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);                    //false para adicionar um so (ha o botao e o texto do botao), DOM entender que e para disparar somente uma vez o evento
        });
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    addOperation(value){
        //add no array
        this._operation.push(value);
        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){
        
        switch (value) {

            case 'ac':
                this.clearAll();
            break;

            case 'ce':
                this.clearEntry();
            break;

            case 'soma':

            break;

            case 'subtracao':

            break;

            case 'divisao':

            break;

            case 'multiplicacao':

            break;

            case 'porcento':

            break;

            case 'igual':

            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;

            default:
                this.setError();
            break;
        }
    }

    initButtonsEvents(){
        //pega todas as tags g filhas de button
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");          //sinal > sao seletores filhos
        //console.log(buttons);
        //para cada botao
        buttons.forEach((btn, index)=>{
            //aplicar varios eventos em um elemento
            this.addEventListenerAll(btn, "click drag", e=> {
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);                                                //executa acao do botao
            });
            //quando mouse estiver sobre elemento, mudar cursor
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer";
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