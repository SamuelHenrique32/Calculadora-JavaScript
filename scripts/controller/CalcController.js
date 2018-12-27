class CalcController{                 //possui regras de negocio

    constructor(){                    //chamado automaticamente quando instancia

        this._lastOperator = '';
        this._lastNumber = '';
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

        this.setLastNumberToDisplay();
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
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){                                         //pelo menos 4 itens, efetuar calculo

            this.calc();

        }
    }

    getResult(){
        //console.log('getResult', this._operation);

        return eval(this._operation.join(""));
    }

    calc(){

        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3){

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if(this._operation.length == 3){

            this._lastNumber = this.getLastItem(false);
        }

        //console.log('lastOperator', this._lastOperator);
        //console.log('lastNumber', this._lastNumber);

        let result = this.getResult();

        if(last == '%'){

            result /= 100;
            this._operation = [result];

        } else{
            this._operation = [result];

            if(last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){                                             //padrao true
        let lastItem;

        for(let i = this._operation.length-1; i >= 0 ; i--){

            if(this.isOperator(this._operation[i]) == isOperator){                           //achou numero
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem){
            //if ternario (condicao) ?(entao) :(senao)
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;                                          //se estiver vazio

        //coloca na tela
        this.displayCalc = lastNumber;
    }

    addOperation(value){
        //add no array
        //console.log('A', value,isNaN(this.getLastOperation()));

        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                //trocar operador
                this.setLastOperation(value);

            } else if(isNaN(value)) {
                console.log('Outra coisa', value);
            } else{
                //deve ser primeiro numero a ser add
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else{
            //numero

            if(this.isOperator(value)){
                this.pushOperation(value);
            } else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                //atualizar display
                this.setLastNumberToDisplay();
            }
        }
        //console.log(this._operation);
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
                this.addOperation('+');
            break;

            case 'subtracao':
                this.addOperation('-');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'igual':
                this.calc();
            break;

            case 'ponto':
                this.addOperation('.');
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