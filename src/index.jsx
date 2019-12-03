import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Input, Label, Button  } from 'reactstrap'; 
import '../css/InputError.css'; 
export var list_cadastro = []; 

var objIDRegister;

export function DupRegisterCheck(objID){
    objIDRegister = objID; 
}

var blobk_button = []; 
var error_list = []; 

export var list_comparacao = []; 
export var msgInputComp = false; 

var blockInputComp = false; 


// Variáveis responsaveis por capturar o nome do campo
// na hora da validação. 
var nameInputNumberComp = ""
var nameInputRegistro = ""
var nameInputContato = ""
var nameInpuT = ""
var cheCked = false; 
//var checkedEnabledButton = true

// Utilizado para validar o campo apos sair dele. 
var onBlurInputContato = false; 

// Utilizado para validar o campo apos sair dele. 
var onBlurInputRegistro = false; 

// verificar após um click 
var enterCheckedButton = false; 

// Função utilizada para habilitar o button e desabilitar caso a lista esteja vazia. 
function EnabledButton() {  
    if (enterCheckedButton){ 
        if(error_list.length > 0){
             document.getElementById("myBtn").disabled = true;
        } else {
            document.getElementById("myBtn").disabled = false; 
        }
    }
}

function AddListErro (campo){ 
    var index = error_list.indexOf(campo); 
        if (index < 0 ) error_list.push(campo) 
        if (error_list.length > 0){
            enterCheckedButton = true; 
        }
        console.log(error_list.length)
}

function AddBlockButton (campo){ var index = blobk_button.indexOf(campo); if (index < 0 ) blobk_button.push(campo) } 

function RemoveBlockButton (campo){ blobk_button = blobk_button.filter(item => !campo.includes(item)) }

function RemoveListErro (campo){ 
    error_list = error_list.filter(item => !campo.includes(item)) 
}

function ListComparacaoAdd (campo, value) {
    var list = { name: '', value: ''}
    list.name = campo; list.value = value;
    list_comparacao.push(list)
}

function CompareList (campo, value){
    for (var i = 0; i < list_comparacao.length; i++){
        if (list_comparacao[i].name === campo){
            list_comparacao[i].value = value; 
        }
    }
}

export class InpuT extends Component {
    constructor(props){
        super(props)
        this.state={
            messageError: '', 
            form_input: 'form-control',
        }
        this.setEmptyValue = this.setEmptyValue.bind(this); 
    }

    componentDidMount(){
        // Aqui vai armazenar todos os Input obrigatório em uma lista para
        // que possam ser validados de acordo com a ação do usuario. 
        nameInpuT = ""; 
        //checkedEnabledButton = false;
        if (this.props.req === true){  AddBlockButton(this.props.name); }
    }

    componentWillReceiveProps(props){
        if (props.req === true && props.value.length > 0){ this.setDisableCampoObrigatorio(props.name, true)}
        if (props.req === true && nameInpuT === props.name){
            if (props.value.length === 0 ){ this.setEnableCampObrigatorio(props.name, true, "( Campo obrigatório! )");  }
            if (props.value.length > 0){  this.setDisableCampoObrigatorio(props.name, true); }
        }
        if (props.req === true && cheCked && nameInpuT  === ""){
            if (props.value.length === 0){ this.setEnableCampObrigatorio(props.name, true, "( Campo obrigatório! )"); }
            if (props.value.length > 0){ this.setDisableCampoObrigatorio(props.name, true); }
        }
        nameInpuT = ""
    }
    setEmptyValue = (e) => {
        nameInpuT = e.target.name
        if (this.props.req === true){
            if (e.target.value.length === 0){ this.setEnableCampObrigatorio(e.target.name, true, "( Campo obrigatório! )"); }
            if (e.target.value.length > 0){ this.setDisableCampoObrigatorio(e.target.name, true); }
        }
        cheCked = false
        this.props.updateValue(e.target.name, e.target.value); 
    }
    setEnableCampObrigatorio (nameCamp, campo, msgError) {
        if (campo === true) this.setState({form_input: "form-control inputError"}) 
            this.setState({messageError: msgError})
            AddListErro(nameCamp)
            EnabledButton();
    }
    setDisableCampoObrigatorio (nameCamp, campo){
        if (campo === true) this.setState({form_input: "form-control"}) 
        this.setState({messageError: ""})
        RemoveListErro(nameCamp)
        RemoveBlockButton(nameCamp)
        EnabledButton();
    }

    render() {
        return (
            <div>
                <Input className={this.state.form_input} type="text" name={this.props.name} id={this.props.name} onBlur={this.setEmptyValue} onChange={this.setEmptyValue} value={this.props.value} />
                <Label className="labelError">{this.state.messageError}</Label>
            </div>
        );
    }
}

export class InputContato extends Component {
    constructor(props){
        super(props); 
        this.state={
            inputValidate: false, 
            messageError:'',
            form_input: 'form-control' 
        }
        this.checked_tel = this.checked_tel.bind(this); 
        this.checked_cel = this.checked_cel.bind(this);
    }

    checked_tel = (value, length) =>{
        if (length > 0 && length < 10) this.setEnableCampObrigatorio(this.props.name, true,"( Campo incompleto! )" )
        if (value === "0000000000" || value === "1111111111" || value === "2222222222" || value === "3333333333" || value === "4444444444" || 
            value === "5555555555" || value === "6666666666" || value === "7777777777" || value === "8888888888" || value === "9999999999" ){
                this.setEnableCampObrigatorio(this.props.name, true, "( Número inválido! ) ")
        }
    }

    checked_cel = (value, length) =>{
        if (length > 0 && length < 11) this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")
        if (value === "00000000000" || value === "11111111111" || value === "22222222222" || value === "33333333333" || value === "44444444444" || 
            value === "55555555555" || value === "66666666666" || value === "77777777777" || value === "88888888888" || value === "99999999999" ){
                this.setEnableCampObrigatorio(this.props.name, true, "( Número inválido! )")
        }
    }

    componentDidMount(){
        nameInputContato = ""; 
        if (this.props.req === true){ AddBlockButton(this.props.name); }
    }

    componentWillReceiveProps(props){
        var value = props.value.replace(/[^0-9]/g, '').toString().split("")
        if (props.req === true && cheCked === true && props.tpContato === "FAX"  && value.length > 0 && value.length < 10 ){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
        if (props.req === true && cheCked === true && props.tpContato !=  "FAX"  && value.length > 0 && value.length < 11 ){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
        
        if (props.req === true && cheCked === true && value.length === 0 && nameInputContato === ""){ this.setEnableCampObrigatorio(this.props.name, true,"( Campo Obrigatório! )")}
        if (props.req === true && value.length > 0 && nameInputContato === ""){ this.setDisableCampoObrigatorio(this.props.name, true)}
        
        if (props.req === true && onBlurInputContato === true && props.tpContato === "FAX"  && value.length === 0 && props.name === nameInputContato){ onBlurInputContato = false; this.setEnableCampObrigatorio(props.name, true, "( Campo Obrigatório! )")}
        if (props.req === true && onBlurInputContato === true && props.tpContato !=  "FAX"  && value.length === 0 && props.name === nameInputContato){ onBlurInputContato = false; this.setEnableCampObrigatorio(props.name, true, "( Campo Obrigatório! )")}

        if (props.req === false && onBlurInputContato === true && props.tpContato === "FAX" && value.length > 0 && value.length < 10 && props.name === nameInputContato){ onBlurInputContato = false; this.setEnableCampObrigatorio(props.name, true, "( Campo incompleto! )")}
        if (props.req === false && onBlurInputContato === true && props.tpContato !=  "FAX" && value.length > 0 && value.length < 11 && props.name === nameInputContato){ onBlurInputContato = false; this.setEnableCampObrigatorio(props.name, true, "( Campo incompleto! )")}
        cheCked = false; 
    }

    setEmptyValue = (e) => {
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
        nameInputContato = e.target.name
        if ( this.props.req === true && vlr.length > 0  ){ this.setDisableCampoObrigatorio(e.target.name, true); }
        if (this.props.req === false && vlr.length === 0){ this.setDisableCampoObrigatorio(e.target.name, true); }
        this.props.updateValue(e.target.name, e.target.value); 
    }

    setEnableCampObrigatorio (nameCamp, campo, msgError) {
        if (campo === true){
            this.setState({form_input: "form-control inputError"})
        }
        this.setState({messageError: msgError})
        AddListErro(nameCamp)
        EnabledButton(); 
    }

    setDisableCampoObrigatorio (nameCamp, campo){
        if (campo === true){
            this.setState({form_input: "form-control"})
        }
        this.setState({messageError: ""})
        RemoveListErro(nameCamp)
        RemoveBlockButton(nameCamp)
        EnabledButton(); 
    }

    onBlurChecked = (e) =>{
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("")
        var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString()
        onBlurInputContato = true; 
        {this.props.tpContato === "FAX"? this.checked_tel(stringCamp, vlr.length):this.checked_cel(stringCamp, vlr.length)}
    }

    render() {
        return (
            <div>
                <InputMask className={this.state.form_input} type="text" name={this.props.name} id={this.props.name}
                    mask={this.props.tpContato === "FAX"?'(99) 9999-9999':'(99) 9 9999-9999'}
                    placeholder={this.props.tpContato === "FAX"? '(61) 3620-1515':'(61) 9 9500-4515'}
                    onBlur={this.onBlurChecked} onChange={this.setEmptyValue}  value={this.props.value} />

                <Label className="labelError">{this.state.messageError}</Label>
            </div>
        )
    }
}

export class InputRegistro extends Component {
    constructor(props){
        super(props); 
        this.state={
            message_erro:'', 
            form_input: 'form-control',
            listProprietario: [], 
            registro:{
                name: '', 
                registro: ''
            }
        }
        this.checked_cpf = this.checked_cpf.bind(this); 
        this.checked_cnpj = this.checked_cnpj.bind(this);
    }

    componentDidMount(){
        nameInputRegistro = ""; 
        if (this.props.req === true) AddBlockButton(this.props.name)
    }

    componentWillReceiveProps(props){
        var value = props.value.replace(/[^0-9]/g, '').toString().split("")
        if (props.req === true && cheCked === true && props.registro === "CPF"  && value.length > 0 && value.length < 11 ){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
        if (props.req === true && cheCked === true && props.registro === "CNPJ" && value.length > 0 && value.length < 14 ){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
        if (props.req === true && cheCked === true && value.length === 0 && nameInputRegistro === ""){ this.setEnableCampObrigatorio(this.props.name, true,"( Campo Obrigatório! )")}
        if (props.req === true && value.length > 0 && nameInputRegistro === ""){ this.setDisableCampoObrigatorio(this.props.name, true)}
        
        if (props.req === true && onBlurInputRegistro === true && props.registro === "CPF"  && value.length === 0 && props.name === nameInputRegistro){ onBlurInputRegistro = false; this.setEnableCampObrigatorio(props.name, true, "( Campo Obrigatório! )")}
        if (props.req === true && onBlurInputRegistro === true && props.registro === "CNPJ"  && value.length === 0 && props.name === nameInputRegistro){ onBlurInputRegistro = false; this.setEnableCampObrigatorio(props.name, true, "( Campo Obrigatório! )")}

        if (props.req === false && onBlurInputRegistro === true && props.registro === "CPF"  && value.length > 1 && value.length < 11 && props.name === nameInputRegistro){ onBlurInputRegistro = false; this.setEnableCampObrigatorio(props.name, true, "( Campo incompleto! )")}
        if (props.req === false && onBlurInputRegistro === true && props.registro === "CNPJ" && value.length > 1 && value.length < 14 && props.name === nameInputRegistro){ onBlurInputRegistro = false; this.setEnableCampObrigatorio(props.name, true, "( Campo incompleto! )")}
    }

    checked_cpf = (vlr, value, length) =>{
        // GET: Resultado de validação do CPF
        if (length == 11) {
             var v = [];
    
            // v[0] recebe o resultado da soma e multiplicação, gerando o primeiro digito do CPF.
            v[0] = 1  * vlr[0] + 2 * vlr[1] + 3 * vlr[2];
            v[0] += 4 * vlr[3] + 5 * vlr[4] + 6 * vlr[5];
            v[0] += 7 * vlr[6] + 8 * vlr[7] + 9 * vlr[8];
            v[0] = v[0] % 11;
            v[0] = v[0] % 10;
    
            // v[1] recebe o resultado da soma e multiplicação, gerando o segundo digito do CPF
            v[1] = 1  * vlr[1] + 2 * vlr[2] + 3 * vlr[3];
            v[1] += 4 * vlr[4] + 5 * vlr[5] + 6 * vlr[6];
            v[1] += 7 * vlr[7] + 8 * vlr[8] + 9 * v[0];
            v[1] = v[1] % 11;
            v[1] = v[1] % 10;
        
            // GET: Validação de repetição de digitos. 
            if ((v[0] != vlr[9]) || (v[1] != vlr[10]) || value === "00000000000" || value === "11111111111" || value === "22222222222" || value === "33333333333" || 
                 value === "44444444444" || value === "55555555555" || value === "66666666666" || value === "77777777777" || value === "88888888888" || value === "99999999999") {
                    this.setEnableCampObrigatorio(this.props.name, true,"( CPF Inválido! )")  
            }
        }    
        // GET: Validação de quantidades de digitos em um campo. 
        if (length > 0 && length < 11){ this.setEnableCampObrigatorio(this.props.name, true, "( CPF Incompleto! )")
        }
    }

    checked_cnpj = (vlr, value, length) =>{
        // GET: Verificação dos digitos repetidos no CNPJ. 
        if (value === "00000000000000" || value === "11111111111111" || value === "22222222222222" || value === "33333333333333" ||  value === "44444444444444" || 
            value === "55555555555555" || value === "66666666666666" || value === "77777777777777"||  value === "88888888888888" || value === "99999999999999" ) {
                this.setEnableCampObrigatorio(this.props.name, true, "( CNPJ Inválido!)")
        }
        //GET: Cálcuo CNPJ Validation. 
        if (length == 14) {
            var cn = [];
            // Verificação do primeiro digito. 
            cn[0] =  5 * vlr[0] + 4 * vlr[1] + 3 * vlr[2];
            cn[0] += 2 * vlr[3] + 9 * vlr[4] + 8 * vlr[5];
            cn[0] += 7 * vlr[6] + 6 * vlr[7] + 5 * vlr[8];
            cn[0] += 4 * vlr[9] + 3 * vlr[10] + 2 * vlr[11];
            cn[0] = cn[0] % 11;
            if (cn[0] < 2) { cn[0] = 0; } else { cn[0] = 11 - cn[0]; }

            // Verificação do segundo digito. 
            cn[1] = 6 * vlr[0] + 5 * vlr[1] + 4 * vlr[2];
            cn[1] += 3 * vlr[3] + 2 * vlr[4] + 9 * vlr[5];
            cn[1] += 8 * vlr[6] + 7 * vlr[7] + 6 * vlr[8];
            cn[1] += 5 * vlr[9] + 4 * vlr[10] + 3 * vlr[11] + 2 * cn[0];
            cn[1] = cn[1] % 11;
            if (cn[1] < 2) { cn[1] = 0;} else { cn[1] = 11 - cn[1];}

            if ((cn[0] != vlr[12]) || (cn[1] != vlr[13])) { this.setEnableCampObrigatorio(this.props.name, true, "( CNPJ Inválido!) ")}
        }
        if (length > 0 && length < 14){ this.setEnableCampObrigatorio(this.props.name, true , "( CNPJ Incompleto! )")}
    }

    duplicateRegister = (value) =>{
        if (value != ""){
            var found = list_cadastro[0].find(function(element){
                return element.pfpj === value
            })
            if (found != undefined){
                if (found.objID != objIDRegister){ this.setEnableCampObrigatorio(this.props.name, true,"( Registro Existente! )") }
            }
        }
    }

    setEmptyValue = (e) => {
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
        nameInputRegistro = e.target.name
        if ( this.props.req === true && vlr.length > 0  ){ this.setDisableCampoObrigatorio(e.target.name, true); }
        if (this.props.req === false && vlr.length === 0){ this.setDisableCampoObrigatorio(e.target.name, true); }
        this.props.updateValue(e.target.name, e.target.value); 
    }

    setEnableCampObrigatorio (nameCamp, campo, msgError) {
        if (campo === true){
            this.setState({form_input: "form-control inputError"})
        }
        this.setState({messageError: msgError})
        AddListErro(nameCamp)
        //checkedEnabledButton = true; 
        EnabledButton(); 
    }

    setDisableCampoObrigatorio (nameCamp, campo){
        if (campo === true){
            this.setState({form_input: "form-control"})
        }
        this.setState({messageError: ""})
        RemoveListErro(nameCamp)
        RemoveBlockButton(nameCamp)
        EnabledButton(); 
        //checkedEnabledButton = false; 
    }

    onBlurChecked = (e) =>{
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("")
        var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString()
        onBlurInputRegistro = true
        {this.props.registro === "CPF"? this.checked_cpf(vlr, stringCamp, vlr.length):this.checked_cnpj(vlr,stringCamp, vlr.length)}
    }

    render() {
        return (
          <div >
                <InputMask className={this.state.form_input} name={this.props.name}  
                    id={this.props.name} type="text" 
                    mask={this.props.registro === "CPF" ? '999.999.999-99' : '99.999.999/9999-99'} 
                    placeholder={this.props.registro === "CPF" ? '123.321.456-45' : '12.456.987/7777-12'} 
                    onBlur={this.onBlurChecked}
                    onChange={this.setEmptyValue}
                    value={this.props.value}
                />
                <Label className="labelError">{this.state.messageError}</Label>
          </div>
        )
    }
}

export class InpuNumberComp extends Component {
    constructor(props){ 
        super(props)
        this.state={
            inputValidate: false, 
            messageerror:'', 
            form_input: 'form-control',
            erro_list:{ nome: '', value: ''}
        }
    }

    componentDidMount(){
        blockInputComp = false;
        if (this.props.req === true){
            AddBlockButton(this.props.name)
        }
        ListComparacaoAdd(this.props.name, this.props.value)
    }


    componentWillReceiveProps(props) {
        if (props.value >= 0){
            CompareList( props.name, props.value )
           // props.valueComp(props.name, this.props.comp);
        }

        if (props.req === true && props.value != ""){
            this.setDisableCampoObrigatorio(props.name, true)
        }

        if (props.req === true && nameInputNumberComp === props.name){
            if (props.value.length === 0){ this.setEnableCampObrigatorio(props.name, true, "( Campo obrigatório! )"); }
            if (props.value.length > 0) this.setDisableCampoObrigatorio(props.name, true); 
        }

        if (props.req === true && cheCked){
            if (nameInputNumberComp === "" || nameInputNumberComp === undefined){
                if (props.value.length === 0){ this.setEnableCampObrigatorio(props.name, true, "( Campo obrigatório! )");}
                if (props.value.length > 0) this.setDisableCampoObrigatorio(props.name, true); 
            }
        }


        if (blockInputComp === true && props.req === true){
            this.setEnableCampObrigatorio(props.name, true, "( Campo inválido! )")
            msgInputComp = true; 
        }
        nameInputNumberComp = ""
    }

    setEmptyValue = (e) =>{

        // Aqui vai verificar sé o campo e obrigatório para validar as informações digitadas.
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
        nameInputNumberComp = e.target.name
        if (e.target.value != undefined && this.props.req === true){
            if (vlr.length === 0){ this.setEnableCampObrigatorio(e.target.name, true, "( Campo obrigatório! )"); }
            if (vlr.length > 0) this.setDisableCampoObrigatorio(e.target.name, true); 
        }

        cheCked = false
        this.props.updateValue(e.target.name, e.target.value); 
        CompareList(nameInputNumberComp, e.target.value)
        var compare = this.props.valueComp(nameInputNumberComp, this.props.comp); 
        blockInputComp = compare
    }

    setEnableCampObrigatorio = (nameCamp, campo, msgError) =>{
        if (campo === true) this.setState({form_input: "form-control inputError"})
        this.setState({messageError: msgError})
        AddListErro(nameCamp)
        //checkedEnabledButton = true;
        EnabledButton(); 
    }

    setDisableCampoObrigatorio = (nameCamp, campo) =>{
        if (campo === true) this.setState({form_input: "form-control"})
        this.setState({messageError: ""})
        RemoveListErro(nameCamp)
        RemoveBlockButton(nameCamp)
        EnabledButton(); 
        //checkedEnabledButton = false;
    }
  
    render(){
        return (
            <div>
                <Input className={this.state.form_input} type="number" name={this.props.name} id={this.props.name} onChange={this.setEmptyValue} value={this.props.value} min={this.props.min}max={this.props.max} onBlur={this.handleSaveNumber} />
                <Label className="labelError">{this.state.messageError}</Label>
            </div>
        )
    }
}

export class Btn extends Component {
    constructor(props){
        super(props)
        this.state={
        }
        this.onLoad = this.onLoad.bind(this); 
    }

    componentDidMount (){
        cheCked = false; 
        document.getElementById("myBtn").disabled = false;
    }

    onLoad = () =>{
        this.props.validate(); 
        cheCked = true; 
        if (blobk_button.length > 0 || error_list.length > 0) document.getElementById("myBtn").disabled = true;
        if (blobk_button.length === 0 || error_list.length === 0){ document.getElementById("myBtn").disabled = false; this.props.form(); }
    }

    render() {
        return (
            <div>
                <Button type="submit" color="primary" id="myBtn" onClick={() =>{this.onLoad()}}>{this.props.value}</Button>
            </div>
        );
    }
}