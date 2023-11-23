//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'))
const port = 3000;

//configurando o banco de dados

mongoose.connect("mongodb://127.0.0.1:27017/fiapbook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//criando a model do seu projetoconst 
const UsuarioSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String
    }
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);

const produtolivrariaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    fornecedor: {
        type: String
    },
    dataDeImpressao: {
        type: Date
    },
    qntEstoque: {
        type: Number
    }
});
const Produtolivraria = mongoose.model("produto", produtolivrariaSchema);

//configuração dos roteamendos//
app.post("/cadastrousuario", async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const senha = req.body.senha

    const usuario = new Usuario({
        name : name,
        email: email,
        senha : senha
    });

    const emailExiste = await Usuario.findOne({email : email}) 

    if(name == null ||email == null || senha == null){
        res.status(400).json({
            error: "prencha todos os campos"
        });
    }

    else if(emailExiste){
        res.status(400).json({
            error: "o email ja existe"
        });
    }
else{
    try {
        const newUsuario = await await usuario.save();
        res.status(400).json({
            error: null,
            msg: "Cadastro ok",
            UsuarioId: newUsuario._id
        });
    } catch (error) {}
}
});

app.post("/cadastroprodutolivraria", async (req, res) => {

    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataDeImpressao = req.body.dataDeImpressao
    const qntEstoque = req.body.qntEstoque

    const produtolivraria = new Produtolivraria({
        codigo : codigo,
        descricao : descricao,
        fornecedor : fornecedor,
        dataDeImpressao : dataDeImpressao,
        qntEstoque : qntEstoque,
    });
    
    const codigoExiste = await Produtolivraria.findOne({codigo : codigo})

    if(codigo == null || descricao == null || fornecedor == null || dataDeImpressao == null || qntEstoque == null){
        res.status(400).json({
            error: "prencha todos os campos"
        });}
    else if(codigoExiste){
                res.status(400).json({
            error: "esse id ja existe"
        });}
    else{
        try {
            const newProdutolivraria = await produtolivraria.save();
            return res.json({
                error: null,
                msg: "Cadastro ok",
                UsuarioId: newProdutolivraria._id
            });
        } catch (error) {}
    }
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname + "/login.html")
});

app.get("/cadastroprodutolivraria", async(req, res)=>{
    res.sendFile(__dirname + "/cadastrar.html")
});

app.listen(port, (res, req) => {
    console.log(`Servidor rodanda na porta ${port}`)
});