// JScript source code
$(document).ready(function () {
    adicionarMascaras();

    buscaInicialDoLayout();

    //Reconfiguração do comportamento do component Bootstrap.Alert de modo a não excluir o elemento do DOM
    $(".alert .close[data-dismiss='alert'], .alertSemOcultar .close[data-dismiss='alert']").click(function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        $(this).closest(".alert").hide();
    });
});

/*
 * Extension method for Date object types.
 * Date.format( dateFormat)
 *  dateFormat:
 *  Type: String
 *  dd = day; MM = month; yyyy = year;
 *  example:
 *      dateFormat = "dd/MM/yyyy"; return somenthing like "16/04/2014"
 */
Date.prototype.format = function (dateFormat) {
    var format = dateFormat || "";

    return format.replace("dd", completeWithZeros(this.getDate(), 2)).replace("MM", completeWithZeros(this.getMonth() + 1, 2)).replace("yyyy", this.getFullYear());
};

//Sobrescrita do método repeat (utilizada para o IE)
if (!String.prototype.repeat) {
    String.prototype.repeat = function (length) {
        var result = "";
        for (var i = 0; i < length; i++) {
            result += this;
        }
        return result;
    };
}

/*
 * Fills an entry number with zeros at left given his length
 * completeWithZeros(number[, length])
 *  number:
 *      Type: integer, String or any numerical entry who are able to trigger toString() method;
 *      Is the entry to be completed with zeros at left side;
 *  length:
 *      Type: integer
 *      Controls the final length of number, consequently defines the amount of zeros(at left) the String return  going to have.
 */
function completeWithZeros(number, length) {
    return "0".repeat(length - number.toString().length) + number;
}

// Regra definida para no máximo 100 anos atraz.
function getMinDate() {
    var minDateDefined = new Date();
    minDateDefined.setYear(minDateDefined.getFullYear() - 100);
    return minDateDefined;
}

// configuração do datepicker para data minima permitida
$(document).ready(function () {
    //$.mask.definitions['~'] = '([0-9]?)';

    $(".datepicker").datepicker("option", {
        minDate: getMinDate(),
        format: "dd/mm/yy"
    });

    // "Pseudo-validação", para controlar o data minima forçada a mão;
    $(".datepicker").change(function () {
        var minDate = getMinDate();
        var selectedDate = $(this).datepicker("getDate");
        var invalidCombination = /(00\/|\/00)/.test($(this).val());
        if (selectedDate < minDate) {
            $(this).val(minDate.format("dd/MM/yyyy"));
        } else if (invalidCombination) {
            $(this).val("");
        }
    });
});

function adicionarMascaras() {
    if (recuperarIdioma() == 'pt-BR') {
        var $brasileiro = $("#Brasileiro option:selected").val();
        var $telefones = $('.numero-telefone');

        //$telefones.mask('9999-9999?9');
        if ($brasileiro == "True" || $brasileiro == null) {
            $telefones.on("change", function () {
                var $this = $(this);

                if ($this.val().length == 10) {
                    $this.mask('99999-999?9');
                } else {
                    $this.mask('9999-9999?9');
                }
            }).change();
            $(".ddd").mask("99");
        } else {
            $telefones.on("change", function () {
                var $this = $(this);

                if ($this.val().length == 10) {
                    $this.unmask();
                } else {
                    $this.unmask();
                }
            }).change();
            $(".ddd").unmask();
        }
        $('#Cnpj').mask('99.999.999/9999-99');
    }

    $('#Cpf').mask('999.999.999-99');

    $('input[type="datetime"]').mask("99/99/9999");

    //$('input[type="datetime"]').addClass('data');
    //$('.data').mask("?99/99/9999");
}

function buscaInicialDoLayout() {
    $(function () {
        $("#buscaUsuarioLayout").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/membro/pesquisar",
                    type: "POST",
                    dataType: "json",
                    //minLength: 3,
                    data: { criterio: request.term, quantidade: 10 },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return { label: item.Label, value: item.NomeCompleto, id: item.Id }
                        }));
                    }
                });
            },
            select: function (event, ui) {
                // window.location.href = "/Membro/Detalhes/" + ui.item.id;
                window.open("/Membro/Detalhes/" + ui.item.id);
            }
        });
    });
}

function Estrangeiro() {
    if ($("#Brasileiro").val() == "False") {
        $("#Rg").attr('disabled', true);
        $("#Cnpj").attr('disabled', true);
        $("#InscricaoEstadual").attr('disabled', true);
        $("#InscricaoMunicipal").attr('disabled', true);

        $("#Cpf").attr('disabled', true);
        $(".ddi").attr('disabled', false);
        $(".ddd").attr('disabled', true);
        $("#desejaTornarSeBenemerito").show();

        $("#DivUfConselho").hide();
        $("#UfConselho").attr('disabled', true);

        $("#DivRg").hide();
        $("#DivCnpj").hide();
        $("#DivInscricaoEstadual").hide();
        $("#DivInscricaoMunicipal").hide();
        $("#DivCpf").hide();
        $(".ddi").show();
        $(".ddd").hide();
    }

    else {
        $("#Cnpj").attr('disabled', false);
        $("#InscricaoEstadual").attr('disabled', false);
        $("#InscricaoMunicipal").attr('disabled', false);
        $("#Rg").attr('disabled', false);
        $("#Cpf").attr('disabled', false);
        $(".ddi").attr('disabled', true);
        $(".ddd").attr('disabled', false);

        $("#DivRg").show();
        $("#DivCpf").show();
        $("#DivCnpj").show();
        $("#DivInscricaoEstadual").show();
        $("#DivInscricaoMunicipal").show();
        $(".ddi").hide();
        $(".ddd").show();
        $(".tel").find(".iHidden").css("color", "blue");
        $("#desejaTornarSeBenemerito").show();
        Pais();
        PaisFiscal();
    }
    adicionarMascaras();
}

function Interesse() {
    var data = $('#ListaInteresse').val();
    var arr = data.split(',');

    for (var i = 0; i < arr.length; i = i + 1) {
        $('input[value=' + arr[i] + ']').attr('checked', true);
        myArray[arr[i]] = true;
    }

    $(".Interesse").on("click",
        function () {
            var valor = $(this).val();

            if (($(this).is(':checked'))) {
                myArray[valor] = true;
            } else {
                myArray[valor] = false;
            }
            stringArray = "";
            for (var i = 0; i < myArray.length; i = i + 1) {
                if (myArray[i] == true) {
                    if (stringArray == "") {
                        stringArray = i
                    } else {
                        stringArray = stringArray + "," + i
                    }
                }
            }

            $("#ListaInteresse").val(stringArray);
        });
}

function SituacaoMembro() {
    if ($("#DivSituacaoMembro :selected").val() == "Benemerito") {
        $("#DivExibirDataValidadeBenemerito").show();
        $("#DataValidadeBenemerito").attr('disabled', false);
    } else {
        $("#DivExibirObservacao").hide();
        $("#DivExibirDataValidadeBenemerito").hide();
        $("#DataValidadeBenemerito").attr('disabled', true);
    }
}

function Pais() {
    $('.loading').hide();

    if (
        $("#Pais :selected").text() == "Brasil") {
        $("#UfBrasil").show();
        $("#Uf").hide();
        $('#Cep').mask('99999-999');
        $("#validation-uf").show();
    } else {
        $("#validation-uf").show();
        $("#Uf").show();
        $("#UfBrasil").hide();
        $('#Cep').unmask();
    }
}

function PaisFiscal() {
    $('.loadingFiscal').hide();

    if (
        $("#PaisFiscal :selected").text() == "Brasil") {
        $("#UfBrasilFiscal").show();
        $("#UfFiscal").hide();
        $('#CepFiscal').mask('99999-999');
    } else {
        $("#UfFiscal").show();
        $("#UfBrasilFiscal").hide();
        $('#CepFiscal').unmask();
    }
}
/*
 ================================ FORMULARIO do CURSO e do CONGRESSO
*/
function Cartao() {
    if ($("#Cartao").val() == "true") {
        $("#CartaoVencimento").attr('disabled', false);
        $("#DivCartaoVencimento").show();
    }
    else {
        $("#CartaoVencimento").attr('disabled', true);
        $("#DiasCartao").val("");
        $("#DivCartaoVencimento").hide();
    }
}

function ItemExtraCartao() {
    CursoTipo();

    if ($("#ItemExtraCartao").val() == "true") {
        $("#ItemExtraCartaoVencimento").attr('disabled', false);
        $("#ItemExtraDivCartaoVencimento").show();
    }
    else {
        $("#ItemExtraCartaoVencimento").attr('disabled', true);
        $("#ItemExtraDiasCartao").val("");
        $("#ItemExtraDivCartaoVencimento").hide();
    }
}

function PossuiItemExtra() {
    if ($("#PossuiItemExtra").val() == "true") {
        $("#RotuloItemExtra").attr('disabled', false);
        $("#RotuloItemExtraIngles").attr('disabled', false);
        $(".divItemExtra").show();

        if ($("#MultiIdioma :selected").val() == "Portugues") {
            $(".divItemExtraIngles").hide();
            $(".divItemExtraPortugues").show();
        } else if ($("#MultiIdioma :selected").val() == "Ingles") {
            $(".divItemExtraIngles").show();
            $(".divItemExtraPortugues").hide();
        } else {
            $(".divItemExtraIngles").show();
            $(".divItemExtraPortugues").show();
        }
    }
    else {
        $("#RotuloItemExtra").attr('disabled', true);
        $("#RotuloItemExtraIngles").attr('disabled', true);
        $(".divItemExtraIngles").hide();
        $(".divItemExtraPortugues").hide();
        $(".divItemExtra").hide();

        $("#ItemExtraBoleto").val("false");
        $("#ItemExtraCartao").val("false");

        ItemExtraBoleto();
        ItemExtraCartao();
    }
}

function ItemExtraBoleto() {
    CursoTipo();

    if ($("#ItemExtraBoleto").val() == "true") {
        $("#ItemExtraBoletoVencimento").attr('disabled', false);
        $("#ItemExtraDivBoletoVencimento").show();
    }
    else {
        $("#ItemExtraBoletoVencimento").attr('disabled', true);
        $("#ItemExtraDiasBoleto").val("");
        $("#ItemExtraDivBoletoVencimento").hide();
    }
}

function Boleto() {
    if ($("#Boleto").val() == "true") {
        $("#BoletoVencimento").attr('disabled', false);
        $("#DivBoletoVencimento").show();
    }
    else {
        $("#BoletoVencimento").attr('disabled', true);
        $("#DiasBoleto").val("");
        $("#DivBoletoVencimento").hide();
    }
}

function CartaAgradecimento() {
    if ($("#CartaAgradecimento").val() == "true") {
        $(".cartaAgradecimento").show();
        MultiIdioma();
    } else {
        $(".cartaAgradecimento").hide();
    }
}

function PermiteSubmissao() {
    if ($("#PermiteSubmissao").val() == "true") {
        $(".permiteSubmissao").show();

        if ($("#MultiIdioma :selected").val() == "Portugues") {
            $(".permiteSubmissaoIngles").hide();
            $("#PopUpSubmissaoIngles").val("");
        } else {
            $(".permiteSubmissaoIngles").show();
        }

        if ($("#MultiIdioma :selected").val() == "Ingles") {
            $(".permiteSubmissaoPortugues").hide();
            $("#PopUpSubmissao").val("");
        } else {
            $(".permiteSubmissaoPortugues").show();
        }
    }
    else {
        $(".permiteSubmissao").hide();
        $(".permiteSubmissaoPortugues").hide();
        $(".permiteSubmissaoIngles").hide();
        $("#DataInicioSubmissao").val("");
        $("#DataTerminoSubmissao").val("");
        $("#LimiteCoautores").val("");
        $("#LimiteResumo").val("");
        $("#PopUpSubmissao").val("");
        $("#PopUpSubmissaoIngles").val("");
    }
}

function ehCaracteristicaCursoOnline(tipoCurso) {
    return tipoCurso == "Online" || tipoCurso == "Estágio";
}

function ehCursoOnline(tipoCurso) {
    return tipoCurso == "Online";
}

function CursoTipo() {
    if (ehCaracteristicaCursoOnline($("#CursoTipo :selected").text())) {
        $(".data-limite-inscricao").datepicker("option", "maxDate", $("#DataTermino").datepicker("getDate"));
        $("#BoletoVencimento").datepicker("option", "maxDate", $("#DataTermino").datepicker('getDate'));
        $("#CartaoVencimento").datepicker("option", "maxDate", $("#DataTermino").datepicker('getDate'));
        $("#ItemExtraBoletoVencimento").datepicker("option", "maxDate", $("#DataTermino").datepicker('getDate'));
        $("#ItemExtraCartaoVencimento").datepicker("option", "maxDate", $("#DataTermino").datepicker('getDate'));
    }
    else {
        $(".data-limite-inscricao").datepicker("option", "maxDate", $("#DataInicio").datepicker("getDate"));
        $("#ItemExtraBoletoVencimento").datepicker("option", "maxDate", $("#DataInicio").datepicker('getDate'));
        $("#ItemExtraCartaoVencimento").datepicker("option", "maxDate", $("#DataInicio").datepicker('getDate'));
    }

    if (ehCursoOnline($("#CursoTipo :selected").text())) {
        $("#Local_Id").attr('disabled', true);
        $("#containerLocal").hide();
        $(".exibirOnline").show();
    } else {
        $("#Local_Id").attr('disabled', false);
        $("#containerLocal").show();
        $(".exibirOnline").hide();
    }

}
//****************************** Ajax para Busca de CEP

$(function () {
    $("#Cep").blur(function () {
        if ($("#Pais").val() == "Brasil") {
            $.ajax({
                url: "/Home/Consultar",
                type: "POST",
                dataType: "json",
                cache: false,
                beforeSend: function () {
                    $('.loading').show(); /*liga o loading */
                },
                data: { id: $("#Cep").val() },
                success: function (_endereco) {
                    //Caso já exista o CPF cadastrado
                    $('.loading').hide(); //hide no loading
                    $("#Logradouro").val(_endereco.Logradouro).blur();
                    $("#Cidade").val(_endereco.Cidade).blur();
                    $("#Bairro").val(_endereco.Bairro).blur();
                    $("#UfBrasil").val(_endereco.UF).blur();
                }
            });
        }
    });
});

//************************************ Capitalize (caixa primeira alta resto baixa)
String.prototype.capitalize = function () {
    return this.replace(/(^|[\s\[\]\(\)\.\,\!\?\:\;\-]+)([A-Za-zÀ-ÿ]+)/g, function (m, p1, p2) {
        var preposicoes = ["da", "das", "do", "dos", "na", "nas", "no", "nos", "em", "de", "desde", "para", "e", "por", "para", "perante", "a", "as", "ante", "até", "após", "em", "entre", "com", "sem", "sob", "sobre", "trás", "o", "os", "ao"],
            ignorePreps = /(\.|\;|\!|\?)/.test(p1) || p1 == "",
            lower = p2.toLowerCase();

        return p1 + (($.inArray(lower, preposicoes) < 0) || ignorePreps ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower);
    });
};
function capitalize(string) {
    return string.capitalize();
    //var final = string.replace(/([\[\]\(\)\s\.\,\!\?\:\;]+)/, "$1 ").split(" ");
    //var total = "";
    //for (var i = 0; i < final.length; i++) {
    //    total += gera(final[i]) + " ";
    //}
    //return total.charAt(0).toUpperCase() + total.slice(1);
}
//
function gera(string) {
    var lower = string.toLowerCase();
    var preposicoes = ["da", "das", "do", "dos", "na", "nas", "no", "nos", "em", "de", "desde", "para", "e", "por", "para", "perante", "a", "as", "ante", "até", "após", "em", "entre", "com", "sem", "sob", "sobre", "trás", "o", "os", "ao"];
    if ($.inArray(lower, preposicoes) < 0) {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    } else {
        return lower;
    }
}

$(window).load(function () {
    $(".capitalize").blur(function () {
        $(this).val($.trim(capitalize($(this).val())));
    });
});
//**********************************************************************************
