// JScript source code
//dropup = function () {
//}

//$(window).load(dropup);
//$(window).bind('resize scroll touchstart touchmove mousewheel', dropup);

var datepickerOptions = {
    closeText: 'Fechar',
    prevText: '&#x3c;Anterior',
    nextText: 'Seguinte',
    currentText: 'Hoje',
    monthNames: [
        'Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: ['Domingo', 'Segunda-feira', 'Ter&ccedil;a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'S&aacute;bado '],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S&aacute;b '],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S&aacute;b '],
    weekHeader: 'Sem',
    dateFormat: 'dd/mm/yy',
    //defaultDate: null,
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    onClose: function () { $(this).focusin().blur(); }
};

$(document).ready(function () {
    alterarIdioma();

    //remove o key up do validator, restando somente a validação no blur do campo
    $.validator.setDefaults({
        onkeyup: false,
        onfocusout: function (element) {
            this.element(element); //< inside 'validate()' method, this is like 'valid()'
        }
    });
});

$(document).ready(function () {
    $("#nav .nav  .dropdown-submenu").hover(function () {
        var $dropDown = $(this).find("> .dropdown-menu");
        $dropDown.css({ 'margin-top': '0px' });
        $dropDown.css({ 'height': 'auto' });
        $dropDown.css({ 'overflow-y': 'initial' });
        var dropDownHeight = $dropDown.outerHeight(true);
        var dropDownTop = $(this).offset().top - $(window).scrollTop();

        var containerHeight = $(window).height();//$("#nav").height();
        //alert(containerHeight);
        //alert(dropDownTop + dropDownHeight);
        var dropdownRange = dropDownHeight + dropDownTop;
        if (dropdownRange >= containerHeight) {
            //Reset

            var navHeight = $("#header").outerHeight(true);

            if (dropDownHeight > containerHeight - navHeight) {
                $dropDown.css({ 'margin-top': '-' + (dropDownTop - navHeight) + 'px' });
                $dropDown.css({ 'height': (containerHeight - navHeight) + 'px' });
                $dropDown.css({ 'overflow-y': 'scroll' });
            } else {
                $dropDown.css({ 'margin-top': '-' + (dropdownRange - containerHeight) + "px" });
            }
        }
    }, function () { });

    // Incluir aviso de campo obrigatório
    addWarningFieldMandatory();

    //alterarIdioma();

    removerAlertas();

    $('input').blur(function () {
        addWarningFieldMandatory();
    });
    // Função para incluir aviso de campo obrigatório

    function removerAlertas() {
        $(document).ready(function () {
            $(".alert:not(.alertSemOcultar)").delay(5000).fadeOut();
        });
    }

    $(function () {
        $(".validarDecimal").keydown(function () {
            $(this).val(validarDecimal($(this).val()));
        });

        $(".validarDecimal").blur(function () {
            $(this).val(validarDecimal($(this).val()));
        });
    });

    $(".alertSemOcultar .close").click(function () {
        $(this).parent().fadeOut();
    });
});

function recuperarIdioma() {
    var linguagem = "pt-BR";

    if ($.cookie('Gforl') != null) {
        var valorCookie = $.cookie('Gforl');
        if (valorCookie.indexOf("idioma=en-US") >= 0)
            linguagem = "en-US";
    }
    return linguagem;
}

function exibirMensagemPorIdioma(nomeVariaval) {
    var linguagem = recuperarIdioma();
    var retorno = "";
    if (linguagem == "pt-BR") {
        switch (nomeVariaval) {
            case "ConfirmacaoExcluir":
                retorno = "Deseja realmente excluir este item?";
                break;
        }
    } else {
        switch (nomeVariaval) {
            case "ConfirmacaoExcluir":
                retorno = "Are you sure?";
                break;
        }
    }

    return retorno;
}

function alterarIdioma() {
    var linguagem = recuperarIdioma();
    if (linguagem == "pt-BR") {
        $.validator.defaults.ignore = ".ignore-validation,:hidden";
        $.extend($.validator.messages, {
            required: "Campo de prenchimento obrigatório.",
            remote: "Por favor, corrija este campo.",
            email: "Por favor, forneça um endereço de email válido.",
            url: "Por favor, forneça uma URL válida.",
            date: "Por favor, forneça uma data válida.",
            dateISO: "Por favor, forneça uma data válida (ISO).",
            number: "Por favor, forneça um número válido.",
            digits: "Por favor, forneça somente dígitos.",
            creditcard: "Por favor, forneça um cartão de crédito válido.",
            equalTo: "Por favor, forneça o mesmo valor novamente.",
            extension: "Por favor, forneça um valor com uma extensão válida.",
            maxlength: $.validator.format("Por favor, forneça não mais que {0} caracteres."),
            minlength: $.validator.format("Por favor, forneça ao menos {0} caracteres."),
            rangelength: $.validator.format("Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."),
            range: $.validator.format("Por favor, forneça um valor entre {0} e {1}."),
            max: $.validator.format("Por favor, forneça um valor menor ou igual a {0}."),
            min: $.validator.format("Por favor, forneça um valor maior ou igual a {0}."),
            nifES: "Por favor, forneça um NIF válido.",
            nieES: "Por favor, forneça um NIE válido.",
            cifEE: "Por favor, forneça um CIF válido."
        });
        //DATE PICKER EM PORTUGUES
        $(".datepicker ").datepicker(datepickerOptions);
    }
}

function validarDecimal(string) {
    var linguagem = recuperarIdioma();

    if (linguagem == "pt-BR") {
        string = string.replace(".", ",");
    } else {
        string = string.replace(",", ".");
    }
    return string;
}

function addWarningFieldMandatory() {
    $('[data-val-required]:visible').not('[type="checkbox"]').each(function () {
        if ($(this).val() == '') {
            $(this).addClass('parsley-validated parsley-error');
        } else {
            $(this).removeClass('parsley-validated parsley-error');
        }
    });
}

// Função para normalizar a aparência dos botoes reponsaveis por manipular a ordem das questoes no formulario de eventos
function normalizeMoveButtonsApearence() {
    var $questoes = $(".questao:not(.QuestaoRemovido)");

    $questoes.find(".move-up, .move-down").removeClass("disabled");

    $questoes.first().find(".move-up").addClass("disabled");
    $questoes.last().find(".move-down").addClass("disabled");
}

$(document).ready(function () {
    $(".trocarIdioma").on("click",
        function () {
            $.ajax({
                type: "GET",
                cache: false,
                url: "/Home/TrocarLinguagem",
                data: { id: $(this).attr("id") },
                success: function (data) {
                    alterarIdioma();
                    window.location.reload(true);
                }
            });
        });
});

//Autor
$(document).ready(function () {
    $(".btnAddAutor").on("click",
        function () {
            adicionarElemento("Autor");
        });
});

$(document).ready(function () {
    $(".btnRemoveAutor").on("click",
        function () {
            removerElemento("Autor", $(this).attr("id"));
        });
});

//Telefone
$(document).ready(function () {
    $(".btnAddTelefone").on("click",
        function () {
            adicionarElemento("Telefone");
        });
});

$(document).ready(function () {
    $(".btnRemoveTelefone").on("click",
        function () {
            removerElemento("Telefone", $(this).attr("id"));
        });
});

//Acompanhante (Models)
$(document).ready(function () {
    $(".btnAddAcompanhanteModels").on("click",
        function () {
            adicionarElemento("AcompanhanteModels");
        });
});

$(document).ready(function () {
    $(".btnRemoveAcompanhanteModels").on("click",
        function () {
            removerElemento("AcompanhanteModels", $(this).attr("id"));
        });
});

//Contato
$(document).ready(function () {
    $(".btnAddContato").on("click",
        function () {
            adicionarElemento("Contato");
        });
});

$(document).ready(function () {
    $(".btnRemoveContato").on("click",
        function () {
            removerElemento("Contato", $(this).attr("id"));
        });
});

//Banners Congresso
$(document).ready(function () {
    $(".btnAddBanner").on("click",
        function () {
            adicionarElemento("Banner");
        });
});

$(document).ready(function () {
    $(".btnRemoveBanner").on("click",
        function () {
            removerElemento("Banner", $(this).attr("id"));
        });
});

//Anexo Mailing
$(document).ready(function () {
    $(".btnAddAnexo").on("click",
        function () {
            adicionarElemento("Anexo");
        });
});

$(document).ready(function () {
    $(".btnRemoveAnexo").on("click",
        function () {
            removerElemento("Anexo", $(this).attr("id"));
        });
});

//Categoria
$(document).ready(function () {
    $(".btnAddCategoria").on("click",
        function () {
            adicionarElemento("Categoria");
        });
});

$(document).ready(function () {
    $(".btnRemoveCategoria").on("click",
        function () {
            removerElemento("Categoria", $(this).attr("id"));
        });
});

//Período de Desconto
$(document).ready(function () {
    $(".btnAddPeriodoDesconto").on("click",
        function () {
            adicionarElemento("PeriodoDesconto");
        });
});

$(document).ready(function () {
    $(".btnRemovePeriodoDesconto").on("click",
        function () {
            removerElemento("PeriodoDesconto", $(this).attr("id"));
        });
});

//Item Contrato
$(document).ready(function () {
    $(".btnAddItemContrato").on("click",
        function () {
            adicionarElemento("ItemContrato");
        });
});

$(document).ready(function () {
    $(".btnRemoveItemContrato").on("click",
        function () {
            removerElemento("ItemContrato", $(this).attr("id"));
        });
});

//Parcela
$(document).ready(function () {
    $(".btnAddParcela").on("click",
        function () {
            adicionarElemento("Parcela");
        });
});

$(document).ready(function () {
    $(".btnRemoveParcela").on("click",
        function () {
            removerElemento("Parcela", $(this).attr("id"));
        });
});

//Período Item Extra
$(document).ready(function () {
    $(".btnAddPeriodoItemExtra").on("click",
        function () {
            adicionarElemento("PeriodoItemExtra");
        });
});

$(document).ready(function () {
    $(".btnRemovePeriodoItemExtra").on("click",
        function () {
            removerElemento("PeriodoItemExtra", $(this).attr("id"));
        });
});

//Organizador
$(document).ready(function () {
    $(".btnAddOrganizador").on("click",
        function () {
            adicionarElemento("Organizador");
        });
});

$(document).ready(function () {
    $(".btnRemoveOrganizador").on("click",
        function () {
            removerElemento("Organizador", $(this).attr("id"));
        });
});

//Local
$(document).ready(function () {
    $(".btnAddLocal").on("click",
        function () {
            adicionarElemento("Local");
        });
});

$(document).ready(function () {
    $(".btnRemoveLocal").on("click",
        function () {
            removerElemento("Local", $(this).attr("id"));
        });
});

//Especialidade
$(document).ready(function () {
    $(".btnAddEspecialidade").on("click",
        function () {
            adicionarElemento("Especialidade");
        });
});

$(document).ready(function () {
    $(".btnRemoveEspecialidade").on("click",
        function () {
            removerElemento("Especialidade", $(this).attr("id"));
        });
});

//Interesse
$(document).ready(function () {
    $(".btnAddInteresse").on("click",
        function () {
            adicionarElemento("Interesse");
        });
});

$(document).ready(function () {
    $(".btnRemoveInteresse").on("click",
        function () {
            removerElemento("Interesse", $(this).attr("id"));
        });
});

//Alternativa
$(document).ready(function () {
    $(".btnAddAlternativa").on("click",
        function () {
            adicionarElemento("Alternativa");
        });
});

$(document).ready(function () {
    $(".btnRemoveAlternativa").on("click",
        function () {
            removerElemento("Alternativa", $(this).attr("id"));
        });
});

//Questao
$(document).ready(function () {
    $(".btnAddQuestao").on("click",
        function () {
            adicionarElemento("Questao");
            normalizeMoveButtonsApearence();
        });
});

$(document).ready(function () {
    $(".btnRemoveQuestao").on("click",
        function () {
            removerElemento("Questao", $(this).attr("id"));
            normalizeMoveButtonsApearence();
        });
});

//E-mail de Responsável
$(document).ready(function () {
    $(".btnRemoveEmailResponsavel").on("click",
        function () {
            removerElemento("EmailResponsavel", $(this).attr("id"));
        });

    $(".btnAddEmailResponsavel").on("click",
        function () {
            adicionarElemento("EmailResponsavel");
        });
});

//Data Limite de Inscrição
$(document).ready(function () {
    $(".btnAddDataLimiteInscricao").on("click",
        function () {
            adicionarElemento("DataLimiteInscricao");
        });
});

$(document).ready(function () {
    $(".btnRemoveDataLimiteInscricao").on("click",
        function () {
            removerElemento("DataLimiteInscricao", $(this).attr("id"));
        });
});

//Grupo de Vagas
$(document).ready(function () {
    $(".btnAddGrupoVaga").on("click",
        function () {
            adicionarElemento("GrupoVaga");
        });
});


//Logo do Patrocinador
$(document).ready(function () {
    $(".btnAddPatrocinadorLogo").on("click",
        function () {
            adicionarElemento("PatrocinadorLogo");
        });
});

$(document).ready(function () {
    $(".btnRemovePatrocinadorLogo").on("click",
        function () {
            removerElemento("PatrocinadorLogo", $(this).attr("id"));
        });
});

//Acompanhante do Item Extra
$(document).ready(function () {
    $(".btnAddAcompanhantes").on("click",
        function () {
            var dataIndex = $(this).attr("data-index");
            var valorIndividual = removerCurrency($("#valorIndividual-" + dataIndex).val());
            var subTotal = removerCurrency($("#subtotal-" + dataIndex).html());
            subTotal = parseFloat(subTotal) + parseFloat(valorIndividual);
            $("#subtotal-" + dataIndex).html(adicionarCurrency(subTotal));
            adicionarElemento("Acompanhantes" + dataIndex);
        });
});

$(document).ready(function () {
    $(".btnRemoveAcompanhantes").on("click",
        function () {
            var dataIndex = $(this).attr("data-index");
            var valorIndividual = removerCurrency($("#valorIndividual-" + dataIndex).val());
            var subTotal = removerCurrency($("#subtotal-" + dataIndex).html());
            subTotal = parseFloat(subTotal) - parseFloat(valorIndividual);
            $("#subtotal-" + dataIndex).html(adicionarCurrency(subTotal));
            removerElemento("Acompanhantes" + dataIndex, $(this).attr("id"));
        });
});

function removerCurrency(valor) {
    return ((valor || "") + "").replace(/[^0-9\,]+/g, "").replace(",", ".");
}

function adicionarCurrency(valor) {
    if (valor == "null" || valor == null) {
        return "";
    }

    return ('R$' + parseFloat(valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").replace(".", "*").replace(",", ".").replace("*", ","));
}

//Opção de Filtro
/*$(document).ready(function () {
    $(".btnRemoveOpcaoFiltroView").on("click",
        function () {
            removerElemento("OpcaoFiltroView", $(this).attr("id"));
        });

    $(".btnAddOpcaoFiltroView").on("click",
        function () {
            adicionarElemento("OpcaoFiltroView");
        });
});*/

//$(document).ready(function () {
//    $(".btnRemoveGrupoVaga").on("click",
//        function () {
//            console.log("JQUERY");
//            removerElemento("GrupoVaga", $(this).attr("id"));
//        });
//});

//Oculta todos os itens em branco
$(document).ready(function () {
    removerDropDownEmBranco("Especialidade");
    removerDropDownEmBranco("Interesse");
    removerDropDownEmBranco("Local");
    removerDropDownEmBranco("Questao");
    removerElementosEmBranco("Telefone");
    removerElementosEmBranco("ItemContrato");
    removerElementosEmBranco("Parcela");
    removerElementosEmBranco("AcompanhanteModels");
    removerElementosEmBranco("Contato");
    removerElementosEmBranco("Categoria");
    removerElementosEmBranco("PeriodoDesconto");
    removerElementosEmBranco("PeriodoItemExtra");
    removerElementosEmBranco("Organizador");
    removerElementosEmBranco("Assinatura");
    removerElementosEmBranco("Palestrante");
    removerElementosEmBranco("Alternativa");
    removerElementosEmBranco("Autor");
    removerElementosEmBranco("EmailResponsavel");
    removerElementosEmBranco("DataLimiteInscricao");
    removerElementosEmBranco("GrupoVaga");
    removerElementosEmBranco("Banner");
    removerElementosEmBranco("Anexo");
    removerElementosEmBranco("OpcaoFiltroView");
    removerElementosEmBranco("PatrocinadorLogo");
});

function adicionarElemento(nomeElemento) {
    var quantidadeRemovida = $("." + nomeElemento + "Removido").length;
    //Caso tenha alguma das opções ocultas então permite a sua visualização
    var elemento = $("." + nomeElemento + "Removido").first();
    if (quantidadeRemovida > 0) {
        $("#" + $(elemento).attr("id")).removeClass(nomeElemento + "Removido");
        $("#" + $(elemento).attr("id")).fadeIn();

        $("#" + $(elemento).attr("id") + " h3").click();
        quantidadeRemovida--;
    }

    //Caso exista apenas um item válido então oculta a opção de remover
    if (quantidadeRemovida == 0) {
        $(".btnAdd" + nomeElemento).fadeOut();
    } else {
        $(".btnAdd" + nomeElemento).fadeIn();
    }
    $('div[id^=btnremove' + nomeElemento + ']').fadeIn();

    $('html, body').animate({
        scrollTop: (+$(elemento).offset().top) + ($(elemento).outerHeight(true) <= $(window).height() ? (-$(window).height() / 2) + (+$(elemento).outerHeight(true) / 2) : 0)
    }, 1000);
}

function removerElementosEmBranco(nomeElemento, criarNovo) {
    var tamanho = $("#container" + nomeElemento + " input.iHidden" + nomeElemento).length,
        index = 0,
        ocultarCampo = false;

    criarNovo = criarNovo || false;
    var campoValido = false;
    while (index < tamanho) {
        campoValido = false;
        if (!ocultarCampo) {
            $("#" + nomeElemento + index + " :input").each(function () {
                //Recupera o nome do elemento
                var nome = $(this).attr("name");
                //Não fazer a substituição se for o ID
                if (nome.indexOf("].Id") != nome.length - 4 && $(this).attr('type') != "checkbox" && $(this).attr('type') != "hidden") {
                    if ($(this).val() != "" && $(this).val() != "0") {
                        ocultarCampo = false;
                        campoValido = true;
                    } else {
                        ocultarCampo = true;
                    }
                }
            });

            if (campoValido) {
                ocultarCampo = false;
            }
        }

        if (ocultarCampo) {
            /*if (index == 0) {
                $('div[id^=btnremove' + nomeElemento + ']').fadeOut();
            }*/
            if ((criarNovo || index == 0) && index < tamanho) {
                if (index == 0 && nomeElemento != "Anexo") {
                    $('div[id^=btnremove' + nomeElemento + ']').fadeOut();
                }
                index++;
                criarNovo = false;
            }

            $("#" + nomeElemento + index).addClass(nomeElemento + "Removido");
            $("#" + nomeElemento + index).fadeOut();
            /*var $h3 = $("#" + nomeElemento + index + " h3");
            var $accordion = $h3.closest("#accordion");
            console.log($accordion.accordion("widget"));*/
            //$h3.closest("ul").accordion("option", "active", 1);
            //Caso exista apenas um item válido então oculta a opção de remover
        }
        index++;
    }

    //Não faz a remoção caso for a inclusão de 'Acompanhantes' dos Itens Extras
    if ($("." + nomeElemento + "Removido").length == 0 && nomeElemento.indexOf("Acompanhantes") < 0) {
        $('.btnAdd' + nomeElemento).fadeOut();
    }
}

function removerDropDownEmBranco(nomeElemento) {
    var tamanho = $("#container" + nomeElemento + " input.iHidden" + nomeElemento).length;
    tamanho--;
    while (tamanho > 0) {
        var ocultarCampo = true;
        $("#" + nomeElemento + tamanho + " :input").each(function () {
            //Recupera o nome do elemento
            var nome = $(this).attr("name");
            //Não fazer a substituição se for o ID
            if (nome.indexOf("].Id") != nome.length - 4 && $(this).attr('type') != "checkbox") {
                if ($(this).val() != "" && $(this).val() != "0") {
                    ocultarCampo = false;
                }
            }
        });

        if (ocultarCampo) {
            $("#" + nomeElemento + tamanho).addClass(nomeElemento + "Removido");
            $("#" + nomeElemento + tamanho).fadeOut();

            //Caso exista apenas um item válido então oculta a opção de remover
            if (tamanho == 1)
                $('div[id^=btnremove' + nomeElemento + ']').fadeOut();
            tamanho--;
        } else {
            tamanho = 0;
        }
    }
}

function removerElemento(nomeElemento, idVariavel) {
    var tamanho = $("#container" + nomeElemento + " input.iHidden" + nomeElemento).length;
    var quantidadeRemovida = $("." + nomeElemento + "Removido").length;
    var itemRemovido = parseInt(tamanho - quantidadeRemovida - 1);
    if (itemRemovido >= 1 || (itemRemovido == 0 && nomeElemento == "Palestrante")) {
        //alert(idVariavel);
        var idField = idVariavel.replace("btnremove" + nomeElemento, "");

        for (var i = idField; i < tamanho; i++) {
            var proximo = parseInt(i) + 1;
            $("#" + nomeElemento + i + " :input:not(.select2-focusser, .select2-input)").each(function () {
                //Recupera o nome do elemento
                var nome = $(this).attr("name");
                var subString = "[" + i + "]";
                var lastIndex = nome.lastIndexOf("[" + i + "]");
                var length = subString.length;
                nome = nome.substring(0, lastIndex) + "[" + proximo + "]" + nome.substring(lastIndex + length);
                //Altera a posição para recuperar o próximo da lista
                //nome = nome.replace("[" + i + "]", "[" + proximo + "]");
                //Altera o valor do elemento atual

                if ($(this).attr("type") == "checkbox") {
                    $(this).prop('checked', $('[name="' + nome + '"]').prop('checked')).change();
                }
                if (this.nodeName == "SELECT" && $(this).hasClass("select2-offscreen")) {
                    $(this).select2("val", $('[name="' + nome + '"]').select2("val"));
                }
                else {
                    $(this).val($('[name="' + nome + '"]').val());
                }
            });
        }

        //Oculta o último item visível na página
        $("#" + nomeElemento + itemRemovido).addClass(nomeElemento + "Removido");
        $("#" + nomeElemento + itemRemovido).fadeOut();

        var $h3 = $("#" + nomeElemento + itemRemovido + " h3");
        var $accordion = $h3.closest("#accordion");
        $accordion.accordion("option", "active", false);
        addWarningFieldMandatory();
    }

    //Caso exista apenas um item válido então oculta a opção de remover (a única exceção é para a página dos Palestrantes, pois não é obrigatório haver algum)
    if (itemRemovido == 1 && nomeElemento != "Palestrante" && nomeElemento != "Anexo") {
        $('div[id^=btnremove' + nomeElemento + ']').fadeOut();
    }
    $(".btnAdd" + nomeElemento).fadeIn();

    if (itemRemovido == 0 && nomeElemento == "Anexo") {
        var idField = idVariavel.replace("btnremove" + nomeElemento, "");

        for (var i = idField; i < tamanho; i++) {
            var proximo = parseInt(i) + 1;
            $("#" + nomeElemento + i + " :input:not(.select2-focusser, .select2-input)").each(function () {
                //Recupera o nome do elemento
                var nome = $(this).attr("name");

                //Altera a posição para recuperar o próximo da lista
                nome = nome.replace("[" + i + "]", "[" + proximo + "]");
                //Altera o valor do elemento atual
                if ($(this).attr("type") == "checkbox") {
                    $(this).prop('checked', $('[name="' + nome + '"]').prop('checked')).change();
                }
                if (this.nodeName == "SELECT" && $(this).hasClass("select2-offscreen")) {
                    $(this).select2("val", $('[name="' + nome + '"]').select2("val"));
                }
                else {
                    $(this).val($('[name="' + nome + '"]').val());
                }
            });
        }
        //Oculta o último item visível na página
        $("#" + nomeElemento + itemRemovido).addClass(nomeElemento + "Removido");
        $("#" + nomeElemento + itemRemovido).fadeOut();

        var $h3 = $("#" + nomeElemento + itemRemovido + " h3");
        var $accordion = $h3.closest("#accordion");
        $accordion.accordion("option", "active", false);
        addWarningFieldMandatory();
        adicionarElemento("Anexo");
    }
}

/*
 ================================
*/
$(function () {
    $(".excluir a, a.excluir").click(function (event) {
        $("#ConfirmActionLinkConfirmButton").attr("href", $(this).attr("href"));

        $("#ConfirmActionLink").modal();
        event.preventDefault();
    });
    //    $(".excluir").click(function (event) {
    //        decisao = confirm("Deseja realmente excluir este item?");
    //        if (decisao) {
    //        } else {
    //            event.preventDefault();
    //        }
    //    });
});

//********************************RAMAL************************
$(function () {
    $("select[id*='Tipo']")
    .change(function () {
        //alert($(".tipoTel :selected").text());
        //if ($(".tipoTel :selected").text() != "Comercial") {
        //    var nome = $(this).attr('name');
        //    nome = nome.replace(".Tipo", ".Ramal");
        //    nome = nome.replace("Contatos", "Telefones");
        //    //$("input[name='" + nome + "']").hide();
        //    alert($(".tipoTel :selected").text());
        //    $("div[class*='" + nome + "']").hide();
        //    //alert(nome);
        //}
        //else {
        //    var nome = $(this).attr('name');
        //    nome = nome.replace(".Tipo", ".Ramal");
        //    $("div[class*='" + nome + "']").show();
        //    //alert(nome);
        //};
    })
.trigger("change");
});

function Ramal(element) {
    var nome = element.name;
    nome = nome.replace(".Tipo", "");
    nome = nome.replace("Telefones", "");
    nome = nome.replace("[", "");
    nome = nome.replace("]", "");
    nome = nome.replace(".Telefone", "");

    nome = nome.replace("Contatos", "");
    //alert(nome);
    if (element.value != "Comercial") {
        $("#Ramal" + nome).hide();
        //alert(nome);
    }
    else {
        $("#Ramal" + nome).show();
        // $("div[class*='" + nome + "']").show();
    }
};

//function FiltroMembro(element) {
//    var valorEnum = $(element).val();
//    var sufixoIdElemento = $(element).attr("id").replace("Nome","");

//    if (valorEnum == 1) {
//        /*$("#" + sufixoIdElemento + "Opcao").addClass("parsley-validated data datepicker");
//        $("#" + sufixoIdElemento + "Valor").addClass("parsley-validated data datepicker");
//        $("#" + sufixoIdElemento + "Opcao").prop('type', 'datetime');
//        $("#" + sufixoIdElemento + "Valor").prop('type', 'datetime');*/

//        $("#" + sufixoIdElemento + "Valor").datepicker();
//    }

//}

function retornarNumeroDecimalPorRomano(romano) {
    var arabico;
    var lookup;
    var i;
    romano = romano.toUpperCase(),
        lookup = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 },
        arabico = 0,
        i = romano.length;
    while (i--) {
        if (lookup[romano[i]] < lookup[romano[i + 1]])
            arabico -= lookup[romano[i]];
        else
            arabico += lookup[romano[i]];
    }
    return arabico;
}

function MultiIdioma() {
    if ($("#MultiIdioma :selected").val() == "Portugues" || $("#MultiIdioma").val() == "Portugues") {
        $("#NomeIngles").attr('disabled', true);
        $("#InformacoesAdicionaisIngles").attr('disabled', true);
        $("#Nome").attr('disabled', false);
        $("#InformacoesAdicionais").attr('disabled', false);
        $(".exibirPortugues").show();
        $(".exibirIngles").hide();
    } else if ($("#MultiIdioma :selected").val() == "Ingles" | $("#MultiIdioma").val() == "Ingles") {
        $("#NomeIngles").attr('disabled', false);
        $("#InformacoesAdicionaisIngles").attr('disabled', false);
        $("#Nome").attr('disabled', true);
        $("#InformacoesAdicionais").attr('disabled', true);
        $(".exibirPortugues").hide();
        $(".exibirIngles").show();
    } else {
        $("#NomeIngles").attr('disabled', false);
        $("#InformacoesAdicionaisIngles").attr('disabled', false);
        $("#Nome").attr('disabled', false);
        $("#InformacoesAdicionais").attr('disabled', false);
        $(".exibirPortugues").show();
        $(".exibirIngles").show();
    }

    PossuiItemExtra();
};
//******************FIM RAMAL ************************

function GerarCodigoInterno() {
    var nome = $("#Nome").val();
    var nomeEvento = nome.split(" ");
    var retorno = "";
    var numeral = "";
    var i;
    for (i = 0; i < nomeEvento.length; i++) {
        nomeEvento[i] = nomeEvento[i].replace("º", "");
        if (nomeEvento[i] !== "da" && nomeEvento[i] !== "do" && nomeEvento[i] !== "na" && nomeEvento[i] !== "no" && nomeEvento[i] !== "em" && nomeEvento[i] !== "de" && nomeEvento[i] !== "do" && nomeEvento[i] !== "desde" && nomeEvento[i] !== "para" && nomeEvento[i] != "e" && nomeEvento[i] != "o" && nomeEvento[i] != "a" && isNaN(nomeEvento[i]) && isNaN(retornarNumeroDecimalPorRomano(nomeEvento[i]))) {
            retorno += nomeEvento[i].charAt(0);
        }
        if (!isNaN(nomeEvento[i]) && nomeEvento[i] != "" && i == 0) {
            numeral = "-" + nomeEvento[i];
        }

        //Caso a primeira palavra seja algorismo romano
        if (i == 0 && !isNaN(retornarNumeroDecimalPorRomano(nomeEvento[i])))
            numeral = "-" + nomeEvento[i];
    }
    retorno = retorno.toUpperCase();

    /*if (numeral == "-")
        numeral = "";*/

    retorno += numeral;

    var codigoInternoCompleto = false;

    if ($("#DataTermino").val() != "") {
        var dataQuebrada = $("#DataTermino").val().split("/");
        for (i = 0; i < dataQuebrada.length; i++) {
            if (dataQuebrada[i].length == 4 && dataQuebrada[i] != "____") {
                retorno += "/" + dataQuebrada[i];
                codigoInternoCompleto = true;
            }
        }
    }

    if (codigoInternoCompleto) {
        $.ajax({
            url: "/Eventos/recuperarCodigoInterno",
            type: "POST",
            dataType: "json",
            data: { codigoInterno: retorno },
            success: function (novoCodigo) {
                $("#Codigo").val(novoCodigo).change();
            }
        });
    } else {
        $("#Codigo").val(retorno).change();
    }
}

function horarioInicioTermino() {
    $('.horarioInicio').mask('99:99');
    $('.horarioTermino').mask('99:99');

    $(".horarioInicio").blur(function () {
        horarioinicio($(this).attr("id"));
    });

    $(".horarioTermino").blur(function () {
        horarioinicio($(this).attr("id"));
    });
}

function horarioinicio(origem) {
    var idInicio = origem.replace("HorarioTermino", "HorarioInicio");
    var idTermino = origem.replace("HorarioInicio", "HorarioTermino");
    var horarioInicio = $("#" + idInicio).val();
    var horarioTermino = $("#" + idTermino).val();

    if (horarioInicio > horarioTermino && horarioInicio != "" && horarioTermino != "") {
        if (origem.indexOf("HorarioInicio") > 0) {
            $("#" + idTermino).val("");
        }
        else {
            $("#" + idInicio).val("");
        }
    }
}

function validarDatas($this, callback) {
    $.ajax({
        url: "/Eventos/validarIntervaloDoEvento",
        type: "POST",
        dataType: "json",
        data: { idEvento: $("#Id").val(), dataInicio: $("#DataInicio").val(), dataTermino: $("#DataTermino").val(), nome: $("#Nome").val(), nomeIngles: $("#NomeIngles").val() },
        success: function (msgValidacao) {
            if (msgValidacao != "") {
                //Oculta o botão de salvar e exibe a mensagem de erro
                $("#exibirBotao").fadeOut();
                $("#msgDataInvalida").text(msgValidacao);
                $("#divDataInvalida").fadeIn();

                $('html, body').animate({
                    scrollTop: $("#Nome").offset().top
                }, 2000);

                if ($this != undefined && $this.data != undefined) {
                    $this.data('valid', false);
                }
            } else {
                $("#exibirBotao").fadeIn();
                $("#divDataInvalida").fadeOut();

                if ($this != undefined && $this.data != undefined) {
                    $this.data('valid', true);
                    callback();
                }
            }
        }
    });
}

function getCategoriaByEvento(idEvento, idUsuario) {
    var $selectCategorias = $("#PeriodoDesconto_Id");
    $selectCategorias.find('option:not(:first)').remove();

    $.ajax({
        url: "/inscricao/getCategoriaByEvento",
        type: "POST",
        dataType: "json",
        assync: false,
        //minLength: 3,
        data: { idEvento: idEvento, idUsuario: idUsuario },
        success: function (data) {
            //limpa a lista atual
            $selectCategorias.html("");
            // para cada categoria no json: data
            for (var item in data) {
                var categoria = data[item];
                var periodos = categoria.periodos;

                /// categorias com mais de um periodo de desconto se torna um group com cada periodo;
                if (periodos.length > 1) {
                    $selectCategorias.append("<optgroup label='" + categoria.nome + "'></optgroup>");

                    var $categoriaGroup = $selectCategorias.find('optgroup').last();

                    for (var p in periodos) {
                        var periodo = periodos[p];
                        $categoriaGroup.append("<option value='" + periodo.id + "'>" + categoria.nome + " - " + periodo.data + "; " + periodo.valor + "; " + (categoria.vagas || "") + "</option>");
                    }
                } else if (periodos.length == 1) {
                    $selectCategorias.append("<option value='" + periodos[0].id + "'>" + categoria.nome + " - " + periodos[0].data + "; " + periodos[0].valor + "; " + (categoria.vagas || "") + "</option>");
                }
            }

            //Caso não existe nenhum elemento exibe a mensagem de que não existem categorias disponíveis para o Usuário
            if (data.length == 0) {
                $("#exibirCategorias").hide();
                $("#naoExistemCategorias").show();
            } else {
                $("#exibirCategorias").show();
                $("#naoExistemCategorias").hide();
            }
        },
        beforeSend: function () {
            $("#loadingCategoria").show();
        },
        complete: function () {
            $("#loadingCategoria").hide();
        }
    });
}

function getValorByPeriodoDescontoUsuario(idPeriodo, idUsuario) {
    var valorZerado = $("#valorZerado").val();
    $.ajax({
        url: "/inscricao/getValorByPeriodoUsuario",
        type: "POST",
        dataType: "json",
        assync: false,
        //minLength: 3,
        data: { idPeriodo: idPeriodo, idUsuario: idUsuario, valorZerado: valorZerado },
        success: function (data) {
            $("#Valor").text(data);
        },
        beforeSend: function () {
            $("#loadingValor").show();
        },
        complete: function () {
            $("#loadingValor").hide();
        }
    });
}

function updateNomeEvento() {
    var $eventNameContainer = $(".Nome_Evento");
    $eventNameContainer.text($("#Evento_Id option:selected").text());
}

function updateNomeCategoria() {
    var $eventNameContainer = $("#Nome_Categoria");

    $eventNameContainer.text($("#PeriodoDesconto_Id option:selected").text());
}

function updateNomePatrocinador() {
    var $eventNameContainer = $("#Nome_Patrocinador");

    if ($("#divPatrocinadores").css('display') != undefined && $("#divPatrocinadores").css('display') != 'none') {
        $("#possuiPatrocinador").show();
        $eventNameContainer.text($("#Patrocinador_Id option:selected").text());
    } else {
        $("#possuiPatrocinador").hide();
    }
}

function format(mDate) {
    var _date = mDate || new Date();
    var dd = _date.getDate();
    var mm = _date.getMonth() + 1; //January is 0!
    var yyyy = _date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    _date = dd + '/' + mm + '/' + yyyy;
    return _date;
};

/*
 * Extension method for Date object types for DatePicker format.
 * Date.datePickerFormat (dateFormat)
 *  dateFormat:
 *  Type: String
 *  dd = day; mm = month; yy = year;
 *  example:
 *      dateFormat = "dd/mm/yy"; return something like "16/04/2014"
 */
Date.prototype.datePickerFormat = function (dateFormat) {
    var format = dateFormat || "";

    return format.replace("dd", completeWithZeros(this.getDate(), 2)).replace("mm", completeWithZeros(this.getMonth() + 1, 2)).replace("yy", this.getFullYear());
};

/*
 * Função genérica para contagem de palavras levando em conta somente os espaços
 *
 */
function wordCount(text) {
    //empty string
    if (!text || !text.length || /^[\s]+$/.test(text)) {
        return 0;
    }

    var pattern = /[\s]+/gi;
    var count = text.replace(pattern, " ").replace(/[\s]+$/gi, "").replace(/^[\s]+/gi, "").split(" ").length;

    return count;
};

/*
 * This prototype is provided by the Mozilla foundation to certify that 'Array.prototype.filter()' is compatible.
 *
 */
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisArg */) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}

$(function () {
    $('.popup-link').click(function () {
        var href = $(this).attr('href');
        $('<div><p class="popup-content"></p></div>').dialog({
            autoOpen: true,
            modal: true,
            height: 400,
            width: "70%",
            left: "0",
            open: function () {
                $(this).find('.popup-content').load(href);
            }
        });
        return false;
    });

    $('.modal-link').click(function () {
        var href = $(this).attr('href');
        $('<div><p class="modal-content"></p></div>').dialog({
            autoOpen: true,
            modal: true,
            height: 400,
            width: "70%",
            left: "0",
            open: function () {
                $(this).find('.modal-content').load(href);
            }
        });
        return false;
    });
});
