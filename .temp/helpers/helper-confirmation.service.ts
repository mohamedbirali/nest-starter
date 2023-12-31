import { Injectable } from "@angular/core";
import { FuseConfirmationConfig, FuseConfirmationService } from "@fuse/services/confirmation";

@Injectable()
export class EaHelperConfirmationService {
    constructor (
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    /**
     * @param entityName indicate what's to delete
     * @returns Observable<any>
     */
    confirmDelete$(entityName: string) {
        const configRemoveDialog =
            this._fuseConfirmationService.open(
                deleteDialogConfirmation(`${entityName}`)
            );

        return configRemoveDialog.afterClosed();
    }
} 

export const deleteDialogConfirmation = 
  (entity: string): FuseConfirmationConfig => ({
    title: 'ÊTES VOUS SUR(E) !',
    actions: {
      confirm: {
        show: true,
        color: 'warn',
        label: 'Valider'
      },
      cancel: {
        show: true,
        label: 'Annuler'
      }
    },
    dismissible: true,
    icon: {
      name: 'heroicons_outline:exclamation-triangle',
      color: 'warn',
      show: true,
    },
    message: `Voulez-vous supprimer ${entity.toLowerCase()} ?`,
});