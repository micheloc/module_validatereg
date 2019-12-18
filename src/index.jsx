import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Input, Label, Button  } from 'reactstrap'; 
import '../css/InputError.css'
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
var validateReg = false; 
var verify = false;

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
        nameInpuT = ""; 
        enterCheckedButton = false;
        if (this.props.req === true){  AddBlockButton(this.props.name); }
    }

    componentWillReceiveProps(props){
        if (props.req === true && props.value.length > 0){ this.setDisableCampoObrigatorio(props.name, true); }
        if (props.req === true && cheCked === true && nameInpuT === props.name  && props.value.length === 0){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")}
        if (props.req === true && cheCked === true && nameInpuT === ""  && props.value.length === 0){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")}
        nameInpuT = ""
    }

    setEmptyValue = (e) => {
        cheCked = false
        nameInpuT = e.target.name
        if (this.props.req === true && e.target.value.length === 0){ this.setEnableCampObrigatorio(e.target.name, true, "( Campo obrigatório! )"); }
        if (this.props.req === true && e.target.value.length  >  0){ this.setDisableCampoObrigatorio(this.props.name, true) }
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
        enterCheckedButton = false;
        validateReg = false;
        if (this.props.req === true){ AddBlockButton(this.props.name); }
    }

    componentWillReceiveProps(props){
        var vlr = props.value.replace(/[^0-9]/g, '').toString().split("")
        if (props.req === true  && vlr.length > 0  ){ this.setDisableCampoObrigatorio(props.name, true); } 
        if (props.req === false && vlr.length === 0){ verify = false; this.setDisableCampoObrigatorio(props.name, true)}
        if (props.req === true  && vlr.length === 0){ verify = true }
        if (props.req === true  && validateReg === false && props.tpContato === "fax" && props.value.length === 10){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === true  && validateReg === false && props.tpContato !=  "fax" && props.value.length === 11){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === false && validateReg === false && props.tpContato === "fax" && props.value.length === 10){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === false && validateReg === false && props.tpContato !=  "fax" && props.value.length === 11){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}

        if (props.req === true && cheCked === true && vlr.length === 0 && nameInputContato === ""){ verify = true; this.setEnableCampObrigatorio(this.props.name, true,"( Campo Obrigatório! )")}
    }

    setEmptyValue = (e) => {
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
        var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString();
        cheCked = false
        nameInputContato = e.target.name
        if (this.props.req === true && vlr.length > 0  ){ this.setDisableCampoObrigatorio(e.target.name, true); }
        if (this.props.req === true && vlr.length === 0 || this.props.req === false && vlr.length > 0){ this.setDisableCampoObrigatorio(e.target.name, true); }
        if (this.props.tpContato === "fax" && vlr.length === 10) { this.checked_tel(stringCamp, vlr.length) }
        if (this.props.tpContato !=  "fax" && vlr.length === 11) { this.checked_cel(stringCamp, vlr.length) } 
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
        if (this.props.req === true  && this.props.tpContato === "fax" && vlr.length === 0 && this.props.name === nameInputContato){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")}
        if (this.props.req === true  && this.props.tpContato !=  "fax" && vlr.length === 0 && this.props.name === nameInputContato){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")}
        if (this.props.tpContato === "fax" && vlr.length > 0 &&  vlr.length < 10 && this.props.name === nameInputContato){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
        if (this.props.tpContato !=  "fax" && vlr.length > 0 &&  vlr.length < 11 && this.props.name === nameInputContato){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
    }

    render() {
        return (
            <div>
                <InputMask className={this.state.form_input} type="text" name={this.props.name} id={this.props.name}
                    mask={this.props.tpContato === "fax"?'(99) 9999-9999':'(99) 9 9999-9999'}
                    placeholder={this.props.tpContato === "fax"? '(61) 3620-1515':'(61) 9 9500-4515'}
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
        enterCheckedButton = false;
        validateReg = false; 
        if (this.props.req === true) AddBlockButton(this.props.name)
    }

    componentWillReceiveProps(props){
        var vlr = props.value.replace(/[^0-9]/g, '').toString().split("") 
        if (props.req === true  && vlr.length > 0  ){ this.setDisableCampoObrigatorio(props.name, true); } 
        if (props.req === false && vlr.length === 0){ verify = false; this.setDisableCampoObrigatorio(props.name, true)}
        if (props.req === true  && vlr.length === 0){ verify = true }
        if (props.req === true  && validateReg === false && props.registro === "CNPJ" && props.value.length === 18){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === true  && validateReg === false && props.registro === "CPF"  && props.value.length === 14){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === false && validateReg === false && props.registro === "CNPJ" && props.value.length === 18){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === false && validateReg === false && props.registro === "CPF"  && props.value.length === 14){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
        if (props.req === true  && cheCked === true && vlr.length === 0 && nameInputRegistro === ""){ verify = true; this.setEnableCampObrigatorio(props.name, true,"( Campo Obrigatório! )")}
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
            }else{ this.setDisableCampoObrigatorio(this.props.name, true); }
        }    
    }

    checked_cnpj = (vlr, value, length) =>{
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

            if ((cn[0] != vlr[12]) || (cn[1] != vlr[13]) || value === "00000000000000") { this.setEnableCampObrigatorio(this.props.name, true, "( CNPJ Inválido!) ")
            }else{ this.setDisableCampoObrigatorio(this.props.name, true);}
        }
    }

    duplicateRegister = (value) =>{
        try {
            if (value != ""){
                var found = list_cadastro[0].find(function(element){ return element.pfpj === value })
                if (found != undefined){ if (found.objID != objIDRegister){ this.setEnableCampObrigatorio(this.props.name, true,"( Registro Existente! )") } }
            }
         }
         catch (e) {
            console.log("não foi possivel conectar")
         }

    }

    setEmptyValue = (e) => {
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
        var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString();
        nameInputRegistro = e.target.name
        cheCked = false
        if (this.props.req === true && vlr.length > 0  ){ this.setDisableCampoObrigatorio(e.target.name, true); }
        if (this.props.req === false && vlr.length === 0 || this.props.req === false && vlr.length > 0){ this.setDisableCampoObrigatorio(e.target.name, true); }
        if (this.props.registro === "CPF"  && vlr.length === 11) { this.checked_cpf(vlr, stringCamp, vlr.length);  this.duplicateRegister(e.target.value) }
        if (this.props.registro === "CNPJ" && vlr.length === 14) { this.checked_cnpj(vlr, stringCamp, vlr.length); this.duplicateRegister(e.target.value) } 
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
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split(""); 
        if (this.props.req === true  && this.props.registro === "CPF" && vlr.length === 0 && this.props.name === nameInputRegistro){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")}
        if (this.props.req === true  && this.props.registro !=  "CPF" && vlr.length === 0 && this.props.name === nameInputRegistro){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")}
        if (this.props.registro === "CPF" && vlr.length > 0   && vlr.length < 11 && this.props.name === nameInputRegistro){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
        if (this.props.registro !=  "CPF" && vlr.length > 0   && vlr.length < 14 && this.props.name === nameInputRegistro){ this.setEnableCampObrigatorio(this.props.name, true, "( Campo incompleto! )")}
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
        enterCheckedButton = false;
        if (this.props.req === true){
            AddBlockButton(this.props.name)
        }
        ListComparacaoAdd(this.props.name, this.props.value)
    }


    componentWillReceiveProps(props) {
        if (props.req === true && props.value > 0){  this.setDisableCampoObrigatorio(props.name, true); }
        if (props.value >= 0){ CompareList( props.name, props.value ) }
        if (props.req === true && cheCked === true && nameInputNumberComp === "" && props.value.length === 0 ||
            props.req === true && cheCked === true && nameInputNumberComp === "" && props.value === undefined ){ this.setEnableCampObrigatorio(props.name, true, "( Campo obrigatório! )"); }
        if (blockInputComp === true && props.req === true){
            this.setEnableCampObrigatorio(props.name, true, "( Campo inválido! )")
            msgInputComp = true; 
        }
        nameInputNumberComp = ""
    }

    setEmptyValue = (e) =>{
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
        nameInputNumberComp = e.target.name
        if (this.props.req === true && vlr.length === 0){ this.setEnableCampObrigatorio(e.target.name, true, "( Campo obrigatório! )"); }
        if (this.props.req === true && vlr.length  >  0){ this.setDisableCampoObrigatorio(e.target.name, true); }

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
        EnabledButton(); 
    }

    setDisableCampoObrigatorio = (nameCamp, campo) =>{
        if (campo === true) this.setState({form_input: "form-control"})
        this.setState({messageError: ""})
        RemoveListErro(nameCamp)
        RemoveBlockButton(nameCamp)
        EnabledButton(); 
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
        nameInputRegistro = ""
        nameInputContato = ""
        cheCked = true; 
        if (blobk_button.length > 0 && error_list.length > 0 || verify === true) document.getElementById("myBtn").disabled = true;
        if (blobk_button.length === 0 && error_list.length === 0 && verify === false){ document.getElementById("myBtn").disabled = false; this.props.form(); }
    }

    render() {
        return (
            <div>
                <Button type="submit" color="primary" id="myBtn" onClick={() =>{this.onLoad()}}>{this.props.value}</Button>
            </div>
        );
    }
}