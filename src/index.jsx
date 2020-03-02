import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Input, Label, Button, InputGroup  } from 'reactstrap'; 

// functions
import { cnpjValidate, cnpjLength } from '../functions/cnpjValidate.jsx'; 
import { cpfValidate, cpfLength   } from '../functions/cpfValidate.jsx'; 
import { celValidate } from '../functions/celValidate.jsx';
import { telValidate } from '../functions/telValidate.jsx'; 
import { add_block_button, add_list_error, remove_block_button, remove_list_error } from '../functions/blockButton.jsx'; 
import '../css/InputError.css'

export var list_cadastro = []; 

var block_button_list = []; 
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


var config_api; 
var path; 
export function ApiConect(api, caminho){
  config_api = api; 
  path =  caminho; 
}

// Função utilizada para habilitar o button e desabilitar caso a lista esteja vazia. 
function EnabledButton() {  
  if(error_list.length > 0){
    document.getElementById("myBtn").disabled = true;
  } else {
    document.getElementById("myBtn").disabled = false; 
  }
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

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
    // Adiciona os campos obrigatórios. 
    if (this.props.req === true) 
      if (add_block_button(block_button_list,this.props.name))
        block_button_list.push(this.props.name)
  }

  componentWillReceiveProps(props){
    if (props.req === true){
      if (props.value >= 0 && isNumber(props.value)) 
        this.setDisableCampoObrigatorio(props.name, true); 
      
      if (props.value != undefined){
        if (props.value.length > 0)
          this.setDisableCampoObrigatorio(props.name, true); 
        if (cheCked === true && nameInpuT === props.name  && props.value.length === 0)
          this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")
        if (cheCked === true && nameInpuT === ""  && props.value.length === 0)
          this.setEnableCampObrigatorio(this.props.name, true, "( Campo Obrigatório! )")
      }
    }
    nameInpuT = ""
  }

  setEmptyValue = (e) => {
    cheCked = false
    nameInpuT = e.target.name
    if (this.props.req === true && e.target.value.length === 0)
      this.setEnableCampObrigatorio(e.target.name, true, "( Campo obrigatório! )"); 
    if (this.props.req === true && e.target.value.length  >  0)
      this.setDisableCampoObrigatorio(this.props.name, true) 
    this.props.updateValue(e.target.name, e.target.value);
  }

  setEnableCampObrigatorio (nameCamp, campo, msgError) {
    if (campo === true) this.setState({form_input: "form-control inputError"}) 
      this.setState({messageError: msgError}); 
    if (add_list_error(error_list, nameCamp))
      error_list.push(nameCamp); 
    EnabledButton();
  }
  
  setDisableCampoObrigatorio (nameCamp, campo){
    if (campo === true) 
      this.setState({form_input: "form-control"}) 
    this.setState({messageError: ""})
    error_list = remove_list_error(error_list, nameCamp)
    block_button_list = remove_block_button(block_button_list, nameCamp)
    EnabledButton();
  }

  render() {
    return (
      <div>
          <Input 
            className={this.state.form_input} 
            type="text" 
            name={this.props.name} 
            id={this.props.name} 
            onBlur={this.setEmptyValue} 
            onChange={this.setEmptyValue} 
            value={this.props.value}
            disabled={this.props.disabled}  
          />
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
    }

    componentDidMount(){
        nameInputContato = ""; 
        validateReg = false;
        if (this.props.req === true) 
          if (add_block_button(block_button_list,this.props.name))
            block_button_list.push(this.props.name)
    }

    componentWillReceiveProps(props){
      var vlr = props.value.replace(/[^0-9]/g, '').toString().split("")
      if (props.req === false && vlr.length === 0){ this.setDisableCampoObrigatorio(props.name, true)}
      if (props.req === true  && validateReg === false && props.tpContato === "fax" && props.value.length === 10){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
      if (props.req === true  && validateReg === false && props.tpContato !=  "fax" && props.value.length === 11){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
      if (props.req === false && validateReg === false && props.tpContato === "fax" && props.value.length === 10){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
      if (props.req === false && validateReg === false && props.tpContato !=  "fax" && props.value.length === 11){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
      if (props.req === true && cheCked === true && vlr.length === 0 && nameInputContato === ""){ this.setEnableCampObrigatorio(this.props.name, true,"( Campo Obrigatório! )")}
    }

    setEmptyValue = (e) => {
      var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
      var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString();
      cheCked = false
      nameInputContato = e.target.name

      if (this.props.req === true && vlr.length > 0  ){ this.setDisableCampoObrigatorio(e.target.name, true); }
      if (this.props.req === true && vlr.length === 0 || this.props.req === false && vlr.length > 0){ this.setDisableCampoObrigatorio(e.target.name, true); }

      if (this.props.tpContato === "fax" && vlr.length === 10) 
        if (telValidate(stringCamp, vlr.length))
          this.setEnableCampObrigatorio(this.props.name, true, "( Campo Inválido! )");

      if (this.props.tpContato !=  "fax" && vlr.length === 11) 
        if (celValidate(stringCamp, vlr.length))
          this.setEnableCampObrigatorio(this.props.name, true, "( Campo Inválido! )");

      this.props.updateValue(e.target.name, e.target.value); 
    }

    setEnableCampObrigatorio (nameCamp, campo, msgError) {
      if (campo === true){ this.setState({form_input: "form-control inputError"}) }
        this.setState({messageError: msgError});
      if (add_list_error(error_list, nameCamp))
        error_list.push(nameCamp); 
      EnabledButton(); 
    }

    setDisableCampoObrigatorio (nameCamp, campo){
      if (campo === true){ this.setState({form_input: "form-control"}) }
        this.setState({messageError: ""})
        error_list = remove_list_error(error_list, nameCamp)
        block_button_list = remove_block_button(block_button_list, nameCamp)
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
                    onBlur={this.onBlurChecked} onChange={this.setEmptyValue}  value={this.props.value} disabled={this.props.disabled}/>
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


    this.setEnableCampObrigatorio = this.setEnableCampObrigatorio.bind(this); 
    this.setDisableCampoObrigatorio = this.setDisableCampoObrigatorio.bind(this); 
    this.onBlurChecked = this.onBlurChecked.bind(this)
    this.setEmptyValue = this.setEmptyValue.bind(this); 
    this.duplicateRegister = this.duplicateRegister.bind(this); 
  }

  componentDidMount(){
    nameInputRegistro = ""; 
    validateReg = false; 
      
    // Adiciona os campos obrigatórios. 
    if (this.props.req === true) 
      if (add_block_button(block_button_list,this.props.name))
        block_button_list.push(this.props.name)
  }

  componentWillReceiveProps(props){
    var vlr = props.value.replace(/[^0-9]/g, '').toString().split("") 
    if (props.req === true  && validateReg === false && props.registro === "CNPJ" && props.value.length === 18){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
    if (props.req === true  && validateReg === false && props.registro === "CPF"  && props.value.length === 14){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
    if (props.req === false && validateReg === false && props.registro === "CNPJ" && props.value.length === 18){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
    if (props.req === false && validateReg === false && props.registro === "CPF"  && props.value.length === 14){ validateReg = true; this.setDisableCampoObrigatorio(props.name, true);}
    if (props.req === true  && cheCked === true && vlr.length === 0 && nameInputRegistro === ""){ this.setEnableCampObrigatorio(props.name, true,"( Campo Obrigatório! )")}
  }

  duplicateRegister = async (nameCamp,value) =>{
    try {
      let obj = await config_api.get(path, {params: {pfpj: value}}); 
      if (obj.data.length > 0)
        this.setEnableCampObrigatorio(nameCamp, true, "( Dados Existente! )")
    }
    catch (e) {
      console.log(e)
    }
  }

  setEmptyValue = (e) => {
    var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("") 
    var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString();
    nameInputRegistro = e.target.name
    cheCked = false
       
    if (this.props.req === false && vlr.length === 0 || this.props.req === false && vlr.length > 0){ 
      this.setDisableCampoObrigatorio(e.target.name, true); 
    }

    if (this.props.req === true  && vlr.length > 0  ) { 
      this.setDisableCampoObrigatorio(e.target.name, true); 
    }
    
    if (this.props.registro === "CPF"  && vlr.length === 11)
      if(cpfValidate(vlr, stringCamp, vlr.length))
        this.setEnableCampObrigatorio(e.target.name, true, "( Campo Inválido! )")
      else
        this.duplicateRegister(e.target.name,e.target.value); 


    if (this.props.registro === "CNPJ" && vlr.length === 14)
      if(cnpjValidate(vlr, stringCamp, vlr.length))
        this.setEnableCampObrigatorio(e.target.name, true, "( Campo Inválido! )")
      else
        this.duplicateRegister(e.target.name,e.target.value); 


    if (this.props.req === true  && vlr.length === 0) { 
      this.setEnableCampObrigatorio(e.target.name, true, "( Campo obrigatório! )")
    }


    this.props.updateValue(e.target.name, e.target.value); 
  }

  setEnableCampObrigatorio (nameCamp, campo, msgError) {
    if (campo === true) this.setState({form_input: "form-control inputError"})
      this.setState({messageError: msgError}); 
    if (add_list_error(error_list, nameCamp))
      error_list.push(nameCamp); 
    
    EnabledButton(); 
  }

  setDisableCampoObrigatorio (nameCamp, campo){
    if (campo === true) this.setState({form_input: "form-control"})
      this.setState({messageError: ""})
    
    error_list = remove_list_error(error_list, nameCamp)
    block_button_list = remove_block_button(block_button_list, nameCamp)
    EnabledButton(); 
  }

    onBlurChecked =  (e) =>{
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
                    disabled={this.props.disabled}
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
        if (this.props.req === true) 
          if (add_block_button(block_button_list,this.props.name))
            block_button_list.push(this.props.name)
        ListComparacaoAdd(this.props.name, this.props.value)
    }


    componentWillReceiveProps(props) {
        if (props.req === true && props.value > 0){  this.setDisableCampoObrigatorio(props.name, true); }
        if (props.value >= 0){ CompareList( props.name, props.value ) }
        if (props.req === true && cheCked === true && nameInputNumberComp === "" && props.value.length === 0 ||
            props.req === true && cheCked === true && nameInputNumberComp === "" && props.value === undefined ){ this.setEnableCampObrigatorio(props.name, true, "( Campo obrigatório! )"); }
        if (blockInputComp === true && props.req === true){
            this.setEnableCampObrigatorio(props.name, true, "O SOMÁTORIO DA ÁREA IRRIGADA E ÁREA PLANTADA NÃO PODE SER MAIOR QUE A ÁREA TOTAL!")
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
          this.setState({messageError: msgError}); 
        if(add_list_error(error_list, nameCamp))
          error_list.push(nameCamp); 
        EnabledButton(); 
    }

  setDisableCampoObrigatorio = (nameCamp, campo) =>{
    if (campo === true) this.setState({form_input: "form-control"})
      this.setState({messageError: ""})
    error_list = remove_list_error(error_list, nameCamp)
    block_button_list = remove_block_button(block_button_list, nameCamp)
    EnabledButton(); 
  }
  
    render(){
        return (
            <div>
                <Input className={this.state.form_input} type="number" name={this.props.name} id={this.props.name} onChange={this.setEmptyValue} value={this.props.value} min={this.props.min}max={this.props.max} onBlur={this.handleSaveNumber} disabled={this.props.disabled}/>
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
        if (block_button_list.length > 0 && error_list.length > 0) {
          console.log(block_button_list)
          document.getElementById("myBtn").disabled = true;
        }
        if (block_button_list.length === 0 && error_list.length === 0){ 
          document.getElementById("myBtn").disabled = false; this.props.form(); 
        }
    }

    render() {
        return (
            <div>
                <Button type="submit" color="primary" id="myBtn" onClick={() =>{this.onLoad()}}>{this.props.value}</Button>
            </div>
        );
    }
}