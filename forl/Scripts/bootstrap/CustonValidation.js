var CustomValidation = {};

CustomValidation.Init = function () {
    //CustomValidationCPF
    jQuery.validator.addMethod('customvalidationcpf', function (value, element, params) {
        var cpf = value.replace(/[^0-9]/gi, ''); //Remove tudo que não for número

        if (value.length == 0)
            return true; //vazio

        if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
            return false;
        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;

        return true; //cpf válido
    }, '');
    jQuery.validator.unobtrusive.adapters.add('customvalidationcpf', {}, function (options) {
        options.rules['customvalidationcpf'] = true;
        options.messages['customvalidationcpf'] = options.message;
    });

    //CustomValidationCNPJ
    jQuery.validator.addMethod('customvalidationcnpj', function (value, element, params) {
        var cnpj = value;
        // DEIXA APENAS OS NÚMEROS
        cnpj = cnpj.replace('/', '');
        cnpj = cnpj.replace('.', '');
        cnpj = cnpj.replace('.', '');
        cnpj = cnpj.replace('-', '');

        var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
        digitos_iguais = 1;

        if (cnpj.length < 14 && cnpj.length < 15) {
            return false;
        }
        for (i = 0; i < cnpj.length - 1; i++) {
            if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }

        if (!digitos_iguais) {
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) {
                return false;
            }
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, '');
    jQuery.validator.unobtrusive.adapters.add('customvalidationcnpj', {}, function (options) {
        options.rules['customvalidationcnpj'] = true;
        options.messages['customvalidationcnpj'] = options.message;
    });

    jQuery.validator.addMethod('customvalidationdatetime', function (value, element, params) {
        var linguagem = "pt-BR";
        if ($.cookie('Gforl') != null) {
            var valorCookie = $.cookie('Gforl');
            if (valorCookie.indexOf("idioma=en-US") >= 0)
                linguagem = "en-US";
        }
        //Não validar datas vazias
        if (value.length == 0) return true;

        //Não validar datas vazias
        if (value == "__/__/____") return true;

        if (value.length != 10) return false;
        // verificando data
        var data = value;
        var dia = data.substr(0, 2);
        var barra1 = data.substr(2, 1);
        var mes = data.substr(3, 2);
        var barra2 = data.substr(5, 1);
        var ano = data.substr(6, 4);

        //Caso a linguagem tenha o padrão MM/dd/yyyy
        if (linguagem == "en-US") {
            var aux = dia;
            dia = mes;
            mes = aux;
        }

        if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return false;
        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return false;
        if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return false;
        if (ano < 1900) return false;
        return true;
    }, '');  // Mensagem padrão
    jQuery.validator.unobtrusive.adapters.add('customvalidationdatetime', {}, function (options) {
        options.rules['customvalidationdatetime'] = true;
        options.messages['customvalidationdatetime'] = options.message;
    });

    jQuery.validator.addMethod('customvalidationmultiplosemails', function (value, element, params) {
        //Por não ser campo obrigatório, caso esteja vazio permite prosseguir
        if (value == "")
            return true;

        var arr = value.split(';');
        var retorno = true;

        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

        jQuery.each(arr, function (i, val) {
            if (!pattern.test($.trim(val))) {
                retorno = false;
            }
        });
        return retorno;
    }, '');  // Mensagem padrão
    jQuery.validator.unobtrusive.adapters.add('customvalidationmultiplosemails', {}, function (options) {
        options.rules['customvalidationmultiplosemails'] = true;
        options.messages['customvalidationmultiplosemails'] = options.message;
    });

    jQuery.validator.addMethod('customvalidationnomecompleto', function (value, element, params) {
        //Por não ser campo obrigatório, caso esteja vazio permite prosseguir
        if (value == "")
            return true;
        value = $.trim(value);

        var pattern = /^[A-Za-zÀ-ÿ\'\´\`\.\,]{2,}((\s+[A-Za-zÀ-ÿ\'\´\`\.\,]{2,})|((\s+[AEIOUYaeiouy]{1,})(\s+[A-Za-zÀ-ÿ\'\´\`\.\,]{2,}))){1,}\s*$/;

        if (!pattern.test($.trim(value))) {
            return false;
        }
        return true;
    }, '');  // Mensagem padrão
    jQuery.validator.unobtrusive.adapters.add('customvalidationnomecompleto', {}, function (options) {
        options.rules['customvalidationnomecompleto'] = true;
        options.messages['customvalidationnomecompleto'] = options.message;
    });

    jQuery.validator.addMethod('customvalidationmaxwords', function (value, element, params) {
        //Por não ser campo obrigatório, caso esteja vazio permite prosseguir
        var quantidade = wordCount(value);
        var tamanhoMaximo = $(element).data("valCustomvalidationmaxwordsLength");

        return quantidade <= tamanhoMaximo;
    }, '');  // Mensagem padrão
    jQuery.validator.unobtrusive.adapters.add('customvalidationmaxwords', {}, function (options) {
        options.rules['customvalidationmaxwords'] = true;
        options.messages['customvalidationmaxwords'] = options.message;
    });

    function wordCount(text) {
        if (!text || !text.length || /^[\s]+$/.test(text)) {
            return 0;
        }

        var pattern = /[\s]+/gi;
        var count = text.replace(pattern, " ").replace(/[\s]+$/gi, "").replace(/^[\s]+/gi, "").split(" ").length;

        return count;
    };
};

//executa -- importante que isso seja feito antes do document.ready
CustomValidation.Init();
