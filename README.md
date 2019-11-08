# ValidateReg

React component
Usado para validação de campos como, Telefone, CPF e CNPJ. 

Como fazer a utilização do validatereg. 

Exemplo do import. 
import { InputRegistro, Btn, InputContato } from 'validatereg'




* Propriedade "registro" ela define o tipo do campo, lembrando que aceita somente "CPF" ou "CNPJ". 
* Propriedade "name" define o tipo de campo que será salvo exemplo "pfpj". 
* Propriedade "updateValue" atualiza o Input mantendo as informações. 

//// Detalhe dentro de seu componente principal tem que ter um update value 
//// Exemplo Utilizado no Formik. 
//// exemplo:

        /// Classe principal... 
        export class frmCliente extends Component {
            constructor(props){
                super(props); 
                this.state = {
                    cliente:{
                        pfpj: ''
                    }
                }
            }
            this.updateValue =  this.updateValue.bind(this)

            updateValue = (e) => {
                this.setState({cliente: {...this.state.cliente, [e.target.name]: e.target.value}})
            }

            render() {
                return (
                    <div>
                        <FormCliente
                            setValue={this.updateValue}                        
                            {...this.props}
                            {...this.state}
                        >
                    </div>
                )
            }
        }

        /// Utilizando Formik.... 
        const FormCliente = (props) => (
            <Formik initialValues={props.cliente} enableReinitialize={true} }} >
                <FormK>
                    <InputRegistro 
                        cliente={props.objID}
                        registro={props.setRadioRegistro?'CPF':'CNPJ' } 
                        name={"pfpj"} 
                        updateValue={props.setValue} 
                        value={props.cliente.pfpj}
                        msg_req={"( * Este campo é obrigatório! )"}
                    />
                </FormK>
            </Formik>
        )

* Propriedade "value", ela é utilizada para receber o valor atualizado pelo updateValue que é salvo no state.cliente.pfpj.
//// Assim exibindo ele para o usuário. 

* Propriedade "msg_req" será o nome que você vai dar ao campo obrigatório. 