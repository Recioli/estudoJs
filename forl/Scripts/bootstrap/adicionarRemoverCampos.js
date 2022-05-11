$(function () {
    function removeCampo() {
        $(".removerCampo").unbind("click");
        $(".removerCampo").bind("click", function () {
            i = 0;
            $(".telefones p.campoTelefone").each(function () {
                i++;
            });
            if (i > 1) {
                $(this).parent().remove();
            }
        });
    }
    removeCampo();
    $(".adicionarCampo").click(function () {
        novoCampo = $(".telefones p.campoTelefone:first").clone();
        novoCampo.find("input").val("");
        novoCampo.insertAfter(".telefones p.campoTelefone:last");
        removeCampo();
    });
});
