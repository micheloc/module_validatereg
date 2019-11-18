import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Input, Label, Button  } from 'reactstrap'; 
import '../css/InputError.css'; 

export var formValidate = ""

var disabledDupRegister = true;
var enableSearch = true; 

export function disabledChecked(){
    disabledDupRegister = false;
}
var blockSearch = []; 
var blobk_button = []; 
var error_list = []; 
var nameCamp = ""
var nameInput = ""
var cheCked = false; 


// Verificar campo repetido.. 
var validateCamp = false; 
// Verificar se o campo é obrigatorio é estar vazio. 
var validateInputContato = false; 
var validateInputRegistro = false; 


function EnabledButton() {
    if(error_list.length > 0)
        document.getElementById("myBtn").disabled = true;
    else
        document.getElementById("myBtn").disabled = false
    
}

function AddListErro (campo){  
    var index = error_list.indexOf(campo)
    if (index < 0 ){
        error_list.push(campo)
    }
}

function AddBlockButton (campo){
    var index = blobk_button.indexOf(campo)
    if (index < 0 ){
        blobk_button.push(campo)
    }
} 

function RemoveBlockButton (campo){
    blobk_button = blobk_button.filter(item => !campo.includes(item))
}

function RemoveListErro (campo){
    error_list = error_list.filter(item => !campo.includes(item))
}


function searchValidate (valor){
    if (valor.length > 0 ){
        var encontrei  = blockSearch.filter(item => valor.includes(item.registro))
        if (encontrei.length === 0){
            disabledDupRegister = true; 
        }else{
            disabledDupRegister = false; 
        }
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
        this.handleChange = this.handleChange.bind(this); 
    }

    checked_tel = (value, length) =>{
        if (length > 0 && length < 10){
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( Campo incompleto! ) "})
            AddListErro(this.props.name)
            EnabledButton();
        }

        if (value === "0000000000" || value === "1111111111" || value === "2222222222" ||
        value === "3333333333" || value === "4444444444" || value === "5555555555" ||
        value === "6666666666" || value === "7777777777" || value === "8888888888" ||
        value === "9999999999"){
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( Número inválido! ) "})
            AddListErro(this.props.name)
            EnabledButton();
        }

    }

    checked_cel = (value, length) =>{
        if (length > 0 && length < 11){
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( Campo incompleto! ) "})
            AddListErro(this.props.name)
            EnabledButton();
        }

        if (value === "00000000000" || value === "11111111111" || value === "22222222222" ||
        value === "33333333333" || value === "44444444444" || value === "55555555555" ||
        value === "66666666666" || value === "77777777777" || value === "88888888888" ||
        value === "99999999999"){
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( Número inválido! ) "})
            AddListErro(this.props.name)
            EnabledButton();
        }
    }

    componentDidMount(){
        if (this.props.req === true){
            AddBlockButton(this.props.name)
        }
    }

    componentWillReceiveProps(props){
        if (nameInput === this.props.name || cheCked === true){
            var value = props.value.replace(/[^0-9]/g, '').toString().split("")
            if (props.req === true){
                if (props.name === nameCamp){
                    if (validateInputContato === true){
                        if (value.length >= 0 && value.length < 11){
                            this.setState({form_input: "form-control inputError"})
                            this.setState({messageError: "( Campo obrigatorio!) "})
                            AddListErro(props.name)
                            EnabledButton();
                        }
                    }
                    if (value.length > 0){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
                if (nameCamp === ""){
                    if (value.length <= 0){
                        this.setState({form_input: "form-control inputError"})
                        this.setState({messageError: "( Campo obrigatorio!) "})
                        AddListErro(props.name)
                        EnabledButton();
                    }
                    if (value.length > 0){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
            }
            if (props.req === false){
                if (props.name === nameCamp){
                    if (value.length >= 0){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
            }
            validateInputContato = false 
        }
    }


    setEmptyValue = (e) => {
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("")
        nameCamp = e.target.name
        if (vlr.length > 0){
            this.setState({form_input: "form-control"})
            this.setState({messageError: ""})
            RemoveListErro(this.props.name)
            RemoveBlockButton(this.props.name)
            EnabledButton();
        }
        cheCked = false; 
        this.props.updateValue(e.target.name,e.target.value);
        this.handleChange(); 
    }

    onBlurChecked = (e) =>{
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("")
        var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString()
        validateInputContato = true
        {this.props.name === "fax"? this.checked_tel(stringCamp, vlr.length):this.checked_cel(stringCamp, vlr.length)}
        this.handleChange()
    }

    handleChange = () => {
        nameInput = this.props.name; 
    }

    render() {
        return (
            <div>
                <InputMask
                    className={this.state.form_input}
                    type="text"
                    name={this.props.name}
                    id={this.props.name}
                    mask={this.props.tpContato === "fax"?'(99) 9999-9999':'(99) 9 9999-9999'}
                    placeholder={this.props.tpContato === "fax"? '(61) 3620-1515':'(61) 9 9500-4515'}
                    onBlur={this.onBlurChecked}
                    onChange={this.setEmptyValue}
                    value={this.props.value}
                />
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
        this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount(){
        enableSearch = true; 
        if (this.props.req === true){
            AddBlockButton(this.props.name)
        }
    }

    componentWillReceiveProps(props){
        if (props.value != "" && enableSearch === true){
            let value = Object.assign({}, this.state.registro)
            value["name"] = props.name; 
            value["registro"] = props.value; 
            blockSearch.push(value); 
            enableSearch = false; 
        }

        if (nameInput === this.props.name || cheCked === true){
            var value = props.value.replace(/[^0-9]/g, '').toString().split("")
            // Verifica se o campo é obrigatório. 
            if (props.req === true){
                // verifica o campo digitado... 
                if (props.name === nameCamp){
                    // verifica se o campo foi desmarcado com o onblur. 
                    if (validateInputRegistro === true){
                        if (value.length === 0){
                            this.setState({form_input: "form-control inputError"})
                            this.setState({messageError: "( Campo obrigatorio!) "})
                            AddListErro(props.name)
                            EnabledButton();
                        }
                    }
                    if (value.length > 0){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
                if (nameCamp === ""){
                    if (value.length <= 0){
                        this.setState({form_input: "form-control inputError"})
                        this.setState({messageError: "( Campo obrigatorio!) "})
                        AddListErro(props.name)
                        EnabledButton();
                    }
                    if (value.length > 0){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
            }
            if (props.req === false){
                if (props.name === nameCamp){
                    if (value.length >= 0){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
            }
            validateInputRegistro = false; 
        }
    }

    checked_cpf = (vlr, value, length) =>{
        validateCamp = false
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
            if ((v[0] != vlr[9]) || (v[1] != vlr[10]) ||
            value === "00000000000" || value === "11111111111" || value === "22222222222" || value === "33333333333" ||
            value === "44444444444" || value === "55555555555" || value === "66666666666" || value === "77777777777" || 
            value === "88888888888" || value === "99999999999") {
                this.setState({form_input: "form-control inputError"})
                this.setState({messageError: "( CPF Inválido!) "})
                AddListErro(this.props.name)
                EnabledButton();
                return; 
            }
        }    
        // GET: Validação de quantidades de digitos em um campo. 
        if (length > 0 && length < 11){
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( CPF Incompleto!) "})
            AddListErro(this.props.name)
            EnabledButton();
            return; 
        }

        validateCamp = true; 
    }

    checked_cnpj = (vlr, value, length) =>{
        validateCamp = true
        // GET: Verificação dos digitos repetidos no CNPJ. 
        if (value === "00000000000000" || value === "11111111111111" || value === "22222222222222" || value === "33333333333333"
        ||  value === "44444444444444" || value === "55555555555555" || value === "66666666666666" || value === "77777777777777"
        ||  value === "88888888888888" || value === "99999999999999" ) {
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( CNPJ Inválido!) "})
            AddListErro(this.props.name)
            EnabledButton();
            validateCamp = false  
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

            if (cn[1] < 2) {
                cn[1] = 0;
            } else {
                cn[1] = 11 - cn[1];
            }
            if ((cn[0] != vlr[12]) || (cn[1] != vlr[13])) {
                this.setState({form_input: "form-control inputError"})
                this.setState({messageError: "( CNPJ Inválido!) "})
                AddListErro(this.props.name)
                EnabledButton();
                validateCamp = false  
            }
        }
        if (length > 0 && length < 14){
            this.setState({form_input: "form-control inputError"})
            this.setState({messageError: "( CNPJ Incompleto!) "})
            AddListErro(this.props.name)
            EnabledButton();
            validateCamp = false 
        }
        if (length < 14){
            validateCamp = false
        }
    }

    duplicateRegister = (value) =>{
        if (value  != ""){
            this.props.dbRegister.get("/proprietario")
            .then(response => { this.setState({listProprietario: response.data},()=>{
            var found = this.state.listProprietario.find(function(element) {
                return element.pfpj === value;
            });
            
            if (found != undefined){
                this.setState({form_input: "form-control inputError"})
                this.setState({messageError: "( Registro existente !) "})
                AddListErro(this.props.name)
                EnabledButton();
            }})})
        }
    }

    setEmptyValue = (e) => {
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("")
        nameCamp = e.target.name

        if (vlr.length > 0){
            this.setState({form_input: "form-control"})
            this.setState({messageError: ""})
            RemoveListErro(this.props.name)
            RemoveBlockButton(this.props.name)
            EnabledButton();
        }
        this.props.updateValue(e.target.name,e.target.value);
        searchValidate(e.target.value); 
        this.handleChange()
    }

    onBlurChecked = (e) =>{
        var vlr = e.target.value.replace(/[^0-9]/g, '').toString().split("")
        var stringCamp = e.target.value.replace(/[^0-9]/g, '').toString()
        validateInputRegistro = true
        
        {this.props.registro === "CPF"? this.checked_cpf(vlr, stringCamp, vlr.length):this.checked_cnpj(vlr,stringCamp, vlr.length)}
        searchValidate(e.target.value);

        if (validateCamp === true && disabledDupRegister === true){
            this.duplicateRegister(e.target.value); 
            disabledDupRegister = false; 
        }
        this.handleChange(); 
    }

    handleChange = () =>{
        nameInput = this.props.name
    }

    render() {
        return (
          <div >
                <InputMask 
                    className={this.state.form_input} 
                    name={this.props.name}  
                    id={this.props.name} 
                    type="text" 
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

export class InpuT extends Component {
    constructor(props){
        super(props)
        this.state={
            messageError: '', 
            form_input: 'form-control', 
        }
        this.setEmptyValue = this.setEmptyValue.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
    }
    componentDidMount(){
        if (this.props.req === true){
            AddBlockButton(this.props.name)
        }
    }

    componentWillReceiveProps(props){
        if (nameInput === this.props.name || cheCked === true){
            if (props.req === true ){
                if (props.name === nameCamp){
                    if (props.value === undefined || props.value === ""){
                        this.setState({form_input: "form-control inputError"})
                        this.setState({messageError: "( Campo obrigatorio!) "})
                        AddListErro(props.name)
                        EnabledButton();
                    }
                    if (props.value != ""){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
                if (nameCamp === ""){
                    if (props.value === undefined || props.value === ""){
                        this.setState({form_input: "form-control inputError"})
                        this.setState({messageError: "( Campo obrigatorio!) "})
                        AddListErro(props.name)
                        EnabledButton();
                    }
                    if (props.value != ""){
                        this.setState({form_input: "form-control"})
                        this.setState({messageError: ""})
                        RemoveListErro(props.name)
                        RemoveBlockButton(props.name)
                        EnabledButton(); 
                    }
                }
            }
        }
    }

    setEmptyValue = (e) => {
        if (e.target.value != undefined){
            if (this.props.req ===  true){
                if (e.target.value.length <= 0){
                    nameCamp = e.target.name
                    e.target.className = "form-control inputError"
                    this.setState({ messageError: "( Campo obrigatorio! )"})
                    AddListErro(e.target.name)
                    EnabledButton();
                }else{
                    nameCamp = e.target.name
                    e.target.className = "form-control"
                    this.setState({messageError: "" })
                    RemoveListErro(e.target.name)
                    RemoveBlockButton(e.target.name)
                    EnabledButton(); 
                }
            }    
            cheCked = false       
            this.props.updateValue(e.target.name,e.target.value); 
        }
        this.handleChange()
    }

    handleChange = () => {
        nameInput = this.props.name; 
    }

    render() {
        return (
            <div>
                <Input 
                 className={this.state.form_input} 
                 type="text" name={this.props.name} 
                 id={this.props.name} 
                 onBlur={this.setEmptyValue} 
                 onChange={this.setEmptyValue} 
                 value={this.props.value} 
                />

                <Label className="labelError">{this.state.messageError}</Label>
            </div>
        );
    }
}

export class Btn extends Component {
    constructor(props){
        super(props)
        this.state={

        }
        this.onLoad = this.onLoad.bind(this); 
    }

    onLoad = (e) =>{
        this.props.validate(); 
        nameCamp = ""; 
        cheCked = true; 
        if (blobk_button.length > 0){
            document.getElementById("myBtn").disabled = true;
        }
        else{
            document.getElementById("myBtn").disabled = false;
            this.props.form(); 
        }
    }

    render() {
        return (
            <div>
                <Button type="submit" color="primary" id="myBtn" onClick={this.onLoad}>{this.props.value}</Button>
            </div>
        );
    }
}