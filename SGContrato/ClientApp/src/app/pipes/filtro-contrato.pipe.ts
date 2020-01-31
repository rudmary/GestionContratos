import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroContrato'
})
export class FiltroContratoPipe implements PipeTransform {

  transform(contratos: any[], texto: string): any[] {
    if (!texto)
      return contratos;
    return contratos.filter(contrato => contrato.txt_codigoContrato.toUpperCase().includes(texto.toUpperCase))
  }

}
