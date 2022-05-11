// JavaScript Document

// Limpar valor padrão do campo ao colocar foco
$(document).ready(function () {
    $(".campo_texto").focus(function () {
		if( this.value == this.defaultValue ) {
			this.value = "";
		}
	}).blur(function() {
		if( !this.value.length ) {
			this.value = this.defaultValue;
		}
	});
});
