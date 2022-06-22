function helloWorld(req, res) {
    res.status(200).send({ message: "HOLA MUNDO" });

}

module.exports = {
    helloWorld
}