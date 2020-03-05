import { Button, Label, Input  } from 'reactstrap';
import InputMask from 'react-input-mask';
import React, { Component } from 'react';

var List_Input_Required = []; 

// Ativa o block button de cada componente. 
var Click_Enab_Req_Input = false; 
var Click_Enab_Req_InputContato = false;
var Click_Enab_Req_InputNumber = false; 
var Click_Enab_Req_InputReqgistro = false;
var Click_Enab_Req_InputNumberComp = false; 

var InputNumberKeyPress = "";

var notreptNumber = []; 
var InputNumbeComp = [];
var somaValorInputNumber = 0; 

var config_api; 
var path; 
export function ApiConect(api, caminho){
  config_api = api; 
  path =  caminho; 
}

function Add_List_Input_Required (Campo){ 
  var index = List_Input_Required.indexOf(Campo); 
  if (index < 0){
    List_Input_Required.push(Campo); 
  }
}

function Block_Or_Enabled_Button() {  
  if(List_Input_Required.length > 0 ){
    document.getElementById("Button").disabled = true;
  } else {
    document.getElementById("Button").disabled = false; 
  }
}

function Remove_List_Input_Required (Campo) { 
  List_Input_Required = List_Input_Required.filter(item =>  !Campo.includes(item)); 
}

export class Btn extends Component { 
  constructor(){
    super(); 
    this._onLoad = this._onLoad.bind(this); 
  }

  componentDidMount(){
    document.getElementById("Button").disabled = false; 
  }

  _onLoad = () => {
    this.props.form(false); 

    if ( List_Input_Required.length > 0 ) { 
      Click_Enab_Req_Input = true; 
      Click_Enab_Req_InputContato = true;
      Click_Enab_Req_InputNumber = true; 
      Click_Enab_Req_InputReqgistro = true;
      Click_Enab_Req_InputNumberComp = true; 
      document.getElementById("Button").disabled = true;
      console.log("Lista de componentes obrigatórios em branco."); 
      console.log(List_Input_Required);

    }

    if (List_Input_Required.length === 0) 
    {
      this.props.form(true); 
      document.getElementById("Button").disabled = false; 
      Click_Enab_Req_Input = false; 
      Click_Enab_Req_InputContato = false;
      Click_Enab_Req_InputNumber = false; 
      Click_Enab_Req_InputReqgistro = false;
      Click_Enab_Req_InputNumberComp = false; 
    }
  }

  render(){
    return (
      <div>
        <Button type="submit" color="primary" id="Button" onClick={() =>{this._onLoad()}}>{this.props.value}</Button>
      </div>
    )
  }
}

export class InpuT extends Component {
  constructor(props){
    super(props);
    this.state={
      isValid: false, 
    } 
    this._handleChange = this._handleChange.bind(this); 
    this._onBlur = this._onBlur.bind(this); 
    this._setDisabledRequired = this._setDisabledRequired.bind(this); 
    this._setEnableRequired = this._setEnableRequired.bind(this); 
  }

  componentDidMount(){
    Click_Enab_Req_Input = false
    if ( this.props.req === true ) { Add_List_Input_Required(this.props.name) }
  }

  componentWillReceiveProps(props){
    if ( props.req === true && props.value.length   > 0 ) { Remove_List_Input_Required(props.name); this._setDisabledRequired(); }
    if ( props.req === true && props.value.length === 0 && Click_Enab_Req_Input ) {this._setEnableRequired(); }
  }

  _handleChange = (e) => { 
    this.props.updateValue(e.target.name , e.target.value); 
    if (e.target.value.length === 0 && this.props.req ===  true ){
      this._setEnableRequired(); 
    }

    if (e.target.value.length > 0 && this.props.req === true || e.target.value.length === 0 && this.props.req ===  false){
      this._setDisabledRequired(); 
    }
  }

  _onBlur = (e) => { 
    if (e.target.value.length === 0 && this.props.req ===  true){
      this._setEnableRequired(); 
    }
  }

  _setEnableRequired = () => { 
    this.setState({isValid: true}, () => { 
      Add_List_Input_Required(this.props.name);
      Block_Or_Enabled_Button();  
    })
  }

  _setDisabledRequired = () =>{ 
    Click_Enab_Req_Input = false;
    this.setState({isValid: false}, () => { 
      Remove_List_Input_Required(this.props.name); 
      document.getElementById("Button").disabled = false;
      //Block_Or_Enabled_Button();  
    })
  }

  render() {
    return (
      <div>
        <Input 
          className="form-control col-lg-12" 
          invalid={this.state.isValid} 
          name={this.props.name} 
          id={this.props.name}
          rows={this.props.rows}
          type={this.props.type} 
          onBlur={this._onBlur} 
          onChange={this._handleChange} 
          value={this.props.value}
          disabled={this.props.disabled}
        />
        <Label className="invalid-feedback-show" hidden={!this.state.isValid} >{"( * Campo obrigatório! )"}</Label>
      </div>
    );
  }
}

export class InputContato extends Component {
  constructor(props){
    super(props); 
    this.state={isValida: false, message: ""}
    this._handleChange = this._handleChange.bind(this); 
    this._onBlur = this._onBlur.bind(this); 
    this._setDisabledRequired = this._setDisabledRequired.bind(this); 
    this._setEnableRequired = this._setEnableRequired.bind(this); 
  }

  componentDidMount(){
    Click_Enab_Req_InputContato = false; 
    if ( this.props.req === true )   { Add_List_Input_Required(this.props.name) }

  }

  componentWillReceiveProps(props){
    var value = props.value.replace(/[^0-9]/g, '').toString().split("")
    if ( props.req === false && value.length === 0){ Remove_List_Input_Required(props.name); this.setState({message: ""}) }
    if ( props.req && value.length === 0 && Click_Enab_Req_InputContato ) { this._setEnableRequired("( * Campo obrigatório! )");}
  }

  _handleChange = (e) => { 

    let value = e.target.value.replace(/[^0-9]/g, '').toString().split("")
    
    this.props.updateValue( e.target.name , e.target.value ); 
    
    if ( value.length > 0 || value.length >= 0 && this.props.req === false){
      this._setDisabledRequired(); 
    }
  }

  _onBlur = (e) => { 

    let value = e.target.value.replace(/[^0-9]/g, '').toString().split("")

    if (value.length === 0 && this.props.req ===  true){
      this._setEnableRequired("( * Campo obrigatório! )"); 
    }

    if (this.props.tpContato === "TEL" && value.length > 0 && value.length < 10 || this.props.tpContato === "CEL" && value.length > 0 && value.length < 11){
      this._setEnableRequired("( * Número inválido! )"); 
    }

    if (this.props.tpContato === "TEL" && value.length === 10 || this.props.tpContato === "CEL" && value.length === 11){
      this._setDisabledRequired(); 
    }

  }

  _setDisabledRequired = (msg) =>{ 
    Click_Enab_Req_InputContato = false;
    this.setState({message: msg} , () => { 
      this.setState({isValid: false}, () => { 
        Remove_List_Input_Required(this.props.name); 
        document.getElementById("Button").disabled = false; 
//        Block_Or_Enabled_Button();  
      })
    })
  }

  _setEnableRequired = (msg) => { 
    this.setState({message: msg}, () => { 
      this.setState({isValid: true}, () => { 
        Add_List_Input_Required(this.props.name);
        Block_Or_Enabled_Button();  
      })
    })
  }

  render(){
    return (
      <div>
      <InputMask 
        className="form-control" 
        id={this.props.name}
        name={this.props.name} 
        mask={this.props.tpContato === "TEL"?'(99) 9999-9999':'(99) 9 9999-9999'}
        placeholder={this.props.tpContato === "TEL"? '(61) 3620-1515':'(61) 9 9500-4515'}
        type="text" 
        onBlur={this._onBlur} 
        onChange={this._handleChange} 
        value={this.props.value}
        disabled={this.props.disabled}
      />
      <Label className="invalid-feedback-show" hidden={!this.state.isValid} >{this.state.message}</Label>
      </div>
    )
  }
}

export class InputNumber extends Component {
  constructor(props){
    super(props);
    this.state={
      isValid: false, 
      message: ""
    } 
    this._handleChange = this._handleChange.bind(this); 
    this._onBlur = this._onBlur.bind(this); 
    this._keyPress = this._keyPress.bind(this); 
    this._setDisabledRequired = this._setDisabledRequired.bind(this); 
    this._setEnableRequired = this._setEnableRequired.bind(this); 
  }

  componentDidMount(){
    Click_Enab_Req_InputNumber = false
    if ( this.props.req === true )   { Add_List_Input_Required(this.props.name) }
  }

  componentWillReceiveProps(props){
    if ( props.req && props.value !== "" ) { this._setDisabledRequired() }
    if ( props.req && props.value.length === 0 && Click_Enab_Req_InputNumber) { this.setState({message: "( * Campo obrigatório! )"}); this._setEnableRequired(); }
  }

  _clearKeyPress = () => {
    InputNumberKeyPress = this.props.value; 
  }

  _handleChange = (e) => { 
    this.props.updateValue(e.target.name , e.target.value); 
    InputNumberKeyPress  = e.target.value; 
    if (e.target.value.length === 0 && this.props.req ===  true){
      InputNumberKeyPress = ""
      this.setState({message: "( * Campo obrigatório! )"})
      this._setEnableRequired(); 
    }
 
    if (e.target.value.length > 0 && this.props.req === true ){
      this.setState({message: ""})
      this._setDisabledRequired(); 
    }

    if (e.target.value.length > 0 && this.props.req === false)
    {
      this.setState({message: ""})
      this._setDisabledRequired();
    }
  }

  _keyPress = (e) => {
    InputNumberKeyPress += e.key; 
    if (parseInt(InputNumberKeyPress) > parseInt(this.props.max)){
      var keyCode = (e.keyCode ? e.keyCode : e.which);
      if (keyCode > 47 && keyCode < 58) {
        this.setState({message: "( Máximo permitido : " + this.props.max + ")"})
        this._setEnableRequired(); 
        e.preventDefault();
      }
    }
  }

  _onBlur = (e) => { 
    if (e.target.value.length === 0 && this.props.req ===  true){
      this._setEnableRequired(); 
    }

    if (parseInt(e.target.value) < parseInt(this.props.min)){
      this.setState({message : "( Mínimo permitido : "+ this.props.min + ")"})
      this._setEnableRequired(); 
    }
  }

  _setEnableRequired = () => { 
    this.setState({isValid: true}, () => { 
      Add_List_Input_Required(this.props.name);
      Block_Or_Enabled_Button();  
    })
  }

  _setDisabledRequired = () =>{ 
    Click_Enab_Req_InputNumber = false;
    this.setState({isValid: false}, () => { 
      Remove_List_Input_Required(this.props.name); 
      document.getElementById("Button").disabled = false;
      //Block_Or_Enabled_Button();  
    })

    this.setState({message: ""})
  }

  render() {
    return (
      <div>
        <Input 
          className="form-control" 
          invalid={this.state.isValid} 
          name={this.props.name} 
          id={this.props.name}
          type="number" 
          onBlur={this._onBlur} 
          onChange={this._handleChange} 
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onKeyPress={this._keyPress}
          onClick={this._clearKeyPress}
          disabled={this.props.disabled}
        />
        <Label className="invalid-feedback-show" hidden={!this.state.isValid} >{this.state.message}</Label>
      </div>
    );
  }
}

export class InputNumberComp extends Component {
  constructor(props){
    super(props);
    this.state={
      isValid: false, 
      message: ""
    } 
    this._handleChange = this._handleChange.bind(this); 
    this._onBlur = this._onBlur.bind(this); 
    this._keyPress = this._keyPress.bind(this); 
    this._setDisabledRequired = this._setDisabledRequired.bind(this); 
    this._setEnableRequired = this._setEnableRequired.bind(this); 
  }

  componentDidMount(){
    Click_Enab_Req_InputNumberComp = false
    somaValorInputNumber = 0; 
    if ( this.props.req === true)   { Add_List_Input_Required(this.props.name) }
  }

  componentWillReceiveProps(props){
    if ( props.req  && props.value !== "" ) { this._setDisabledRequired() }
    
    // Conferi ao iniciar o formulario. 
    if ( props.req === false && parseFloat(props.value) >= 0 ) {
      var index = notreptNumber.indexOf(props.name); 
      if (index < 0){
        somaValorInputNumber = 0; 
        notreptNumber.push(props.name)
        InputNumbeComp.push(props.value); 
        for( var i = 0; i < InputNumbeComp.length; i++){
          somaValorInputNumber += parseFloat(InputNumbeComp[i])
        }
      }else{
        somaValorInputNumber = 0; 
        InputNumbeComp[index] = props.value;
        for( var x = 0; x < InputNumbeComp.length; x++){
          somaValorInputNumber += parseFloat(InputNumbeComp[x])
        }
      }
    }


    if ( props.req  && props.value.length === 0 && Click_Enab_Req_InputNumberComp ) { this.setState({message: "( * Campo obrigatório! )"}); this._setEnableRequired(); }
    if ( props.comp && parseFloat(props.value) >= 0 ){
      if (parseFloat(somaValorInputNumber) >= parseFloat(props.value)){
        this.setState({message : "( * O valor tem que ser maior que a soma da área plantada e área irrigada! )"})
        this._setEnableRequired();
      }else{
        if (parseFloat(props.value) > parseFloat(somaValorInputNumber)){
          this._setDisabledRequired(); 
        }
      }
    }
  }

  _clearKeyPress = () => {
    InputNumberKeyPress = this.props.value; 
  }

  _handleChange = (e) => { 
    this.props.updateValue(e.target.name , e.target.value); 
    InputNumberKeyPress  = e.target.value; 
    if (e.target.value.length === 0 && this.props.req ===  true){
      InputNumberKeyPress = ""
      this.setState({message: "( * Campo obrigatório! )"})
      this._setEnableRequired(); 
    }
 
    if (e.target.value.length > 0 ){
      this.setState({message: ""})
      this._setDisabledRequired(); 
    }

    if (this.props.comp === false){
      var index = notreptNumber.indexOf(this.props.name); 
      if (index < 0){
        somaValorInputNumber = 0; 
        notreptNumber.push(this.props.name)
        InputNumbeComp.push(e.target.value); 
        for( var i = 0; i < InputNumbeComp.length; i++){
          somaValorInputNumber += parseFloat(InputNumbeComp[i])
        }
      }else{
        somaValorInputNumber = 0; 
        InputNumbeComp[index] = e.target.value;
        for( var x = 0; x < InputNumbeComp.length; x++){
          somaValorInputNumber += parseFloat(InputNumbeComp[x])
        }
      }
    }
  }

  _keyPress = (e) => {
    InputNumberKeyPress += e.key; 
    if (parseInt(InputNumberKeyPress) > parseInt(this.props.max)){
      var keyCode = (e.keyCode ? e.keyCode : e.which);
      if (keyCode > 47 && keyCode < 58) {
        this.setState({message: "( * Máximo permitido : " + this.props.max + ")"})
        this._setEnableRequired(); 
        e.preventDefault();
      }
    }
  }

  _onBlur = (e) => { 
    if (e.target.value.length === 0 && this.props.req ===  true){
      this._setEnableRequired(); 
    }

    if (parseInt(e.target.value) < parseInt(this.props.min)){
      this.setState({message : "( * Mínimo permitido : "+ this.props.min + ")"})
      this._setEnableRequired(); 
    }
  }

  _setEnableRequired = () => { 
    this.setState({isValid: true}, () => { 
      Add_List_Input_Required(this.props.name);
      Block_Or_Enabled_Button();  
    })
  }

  _setDisabledRequired = () =>{ 
    Click_Enab_Req_InputNumberComp = false;
    this.setState({isValid: false}, () => { 
      Remove_List_Input_Required(this.props.name); 
      document.getElementById("Button").disabled = false;
      //Block_Or_Enabled_Button();  
    })

    this.setState({message: ""})
  }

  render() {
    return (
      <div>
        <Input 
          className="form-control" 
          invalid={this.state.isValid} 
          name={this.props.name} 
          id={this.props.name}
          type="number" 
          onBlur={this._onBlur} 
          onChange={this._handleChange} 
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onKeyPress={this._keyPress}
          onClick={this._clearKeyPress}
          disabled={this.props.disabled}
        />
        <Label className="invalid-feedback-show" hidden={!this.state.isValid} >{this.state.message}</Label>
      </div>
    );
  }
}

export class InputRegistro extends Component { 
  constructor(props){
    super(props);
    this.state={
      isValid: false, 
    } 
    this._handleChange = this._handleChange.bind(this); 
    this._onBlur = this._onBlur.bind(this); 
    this._setDisabledRequired = this._setDisabledRequired.bind(this); 
    this._setEnableRequired = this._setEnableRequired.bind(this); 
  }

  componentDidMount(){
    Click_Enab_Req_InputReqgistro = false; 
    if ( this.props.req === true )  { Add_List_Input_Required(this.props.name) }
  }

  componentWillReceiveProps(props){
    var  value = props.value.replace(/[^0-9]/g, '').toString().split("")
    if ( props.req === false && this.props.optional === true && value.length === 0 ){ Remove_List_Input_Required(props.name); this.setState({message: ""})}
    if ( props.req === true && props.value.length   > 0 ) { Remove_List_Input_Required(props.name); }
    if ( props.req === true  && value.length === 0 && Click_Enab_Req_InputReqgistro === true ) { this._setEnableRequired("( * Campo obrigatório! )")}
  }

  _duplicateRegister = async (value) => {
    try{
      let obj = await config_api.get(path, {params: {pfpj: value}}); 
      if (obj.data.length > 0){
        this._setEnableRequired("( * Registro existente! )")
      }
    }
    catch(e){
      console.log(e)
    }
  }

  _handleChange = (e) => { 
    let value = e.target.value.replace(/[^0-9]/g, '').toString().split("")

    if (value.length > 0){
      this._setDisabledRequired(); 
    }

    if (value.length === 0 && this.props.req ===  true){
       this._setDisabledRequired(); 
    }

    if (value.length === 11 && this.props.registro === "CPF" ){
      this._validateCPF(value, e.target.value); 
    }

    if (value.length === 14 && this.props.registro === "CNPJ"){
      this._validateCNPJ(value, e.target.value); 
    }
    this.props.updateValue(e.target.name , e.target.value); 
  }

  _onBlur = (e) => { 
    let value = e.target.value.replace(/[^0-9]/g, '').toString().split("")
    if (e.target.value.length === 0 && this.props.req ===  true){
      this._setEnableRequired("( * Campo obrigatório! )"); 
    }

    if (e.target.value.length === 0 && this.props.req ===  false){
      this._setDisabledRequired(); 
    }

    if (value.length > 0 && value.length < 11 && this.props.registro === "CPF"){
      this._setEnableRequired("( * CPF Incompleto! )"); 
    }

    if (value.length > 0 && value.length < 14 && this.props.registro === "CNPJ"){
      this._setEnableRequired("( * CNPJ Incompleto! )"); 
    }
  }

  _validateCPF = (vlr, value) => { 
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
    if ( (v[0] != vlr[9]) || (v[1] != vlr[10]) || 
          value === "000.000.000-00" || value === "111.111.111-11" || 
          value === "222.222.222-22" || value === "333.333.333-33" || 
          value === "444.444.444-44" || value === "555.555.555-55" || 
          value === "666.666.666-66" || value === "777.777.777-77" || 
          value === "888.888.888-88" || value === "999.999.999-99"  )
    {
      this._setEnableRequired("( * CPF Invalido! )")
    }else{
      this._duplicateRegister(value); 
    }
  }

  _validateCNPJ = (vlr, value) => { 
    var cn = [];
    // Verificação do primeiro digito. 
    cn[0] =  5 * vlr[0] + 4 * vlr[1] + 3 * vlr[2];
    cn[0] += 2 * vlr[3] + 9 * vlr[4] + 8 * vlr[5];
    cn[0] += 7 * vlr[6] + 6 * vlr[7] + 5 * vlr[8];
    cn[0] += 4 * vlr[9] + 3 * vlr[10] + 2 * vlr[11];
    cn[0] = cn[0] % 11;
      
    if (cn[0] < 2) 
      cn[0] = 0; 
    else 
      cn[0] = 11 - cn[0]; 
        
    // Verificação do segundo digito. 
    cn[1] = 6 * vlr[0] + 5 * vlr[1] + 4 * vlr[2];
    cn[1] += 3 * vlr[3] + 2 * vlr[4] + 9 * vlr[5];
    cn[1] += 8 * vlr[6] + 7 * vlr[7] + 6 * vlr[8];
    cn[1] += 5 * vlr[9] + 4 * vlr[10] + 3 * vlr[11] + 2 * cn[0];
    cn[1] = cn[1] % 11;
      
    if (cn[1] < 2) 
        cn[1] = 0;
    else
      cn[1] = 11 - cn[1];
    if ((cn[0] != vlr[12]) || (cn[1] != vlr[13]) || value === "00.000.000/0000-00"){
      this._setEnableRequired("( * CNPJ Invalido! )");    
    }else{
      this._duplicateRegister(value); 
    }
  }

  _setEnableRequired = (msg) => { 
    this.setState({message: msg } , () => {
      this.setState({isValid: true}, () => { 
        Add_List_Input_Required(this.props.name);
        Block_Or_Enabled_Button();  
      })
    })
  }

  _setDisabledRequired = () =>{ 
    Click_Enab_Req_InputReqgistro = false;
    this.setState({message: ""}, () => { 
      this.setState({isValid: false}, () => { 
        Remove_List_Input_Required(this.props.name); 
        document.getElementById("Button").disabled = false;
        //Block_Or_Enabled_Button();  
      })
    })
  }

  render(){
    return (
      <div>
      <InputMask 
        className="form-control" 
        id={this.props.name}
        name={this.props.name} 
        mask={this.props.registro === "CPF" ? '999.999.999-99' : '99.999.999/9999-99'} 
        placeholder={this.props.registro === "CPF" ? '123.321.456-45' : '12.456.987/7777-12'} 
        onBlur={this._onBlur} 
        onChange={this._handleChange} 
        value={this.props.value}
        disabled={this.props.disabled}
      />
      <Label className="invalid-feedback-show" hidden={!this.state.isValid} >{this.state.message}</Label>
      </div>
    )
  }
}