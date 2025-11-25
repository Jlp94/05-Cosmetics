import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ApiCosmeticosResponse, Cosmetico} from '../../../common/interfaces';
import {CosmeticService} from '../../../services/cosmetic-service';
import {ToastService} from '../../../services/toast-service';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from '../../utils/toast/toast';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {CosmeticEdit} from '../cosmetic-edit/cosmetic-edit';

@Component({
  selector: 'app-cosmetic-list',
  imports: [
    Toast,
    NgbPagination,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './cosmetic-list.html',
  styleUrl: './cosmetic-list.scss',
})
export class CosmeticList implements OnInit {
  private readonly cosmeticService: CosmeticService = inject(CosmeticService);
  protected readonly toastService: ToastService = inject(ToastService);
  private readonly modalService: NgbModal = inject(NgbModal);

  cosmeticResponse!: ApiCosmeticosResponse;
  cosmeticList: WritableSignal<Cosmetico[]> = signal<Cosmetico[]>([]);
  currentPage: number = 1;
  pageSize: number = 10;
  protected search: WritableSignal<string> = signal('');
  noCosmeticsFound: string = "https://www.hejing-plastic.com/template/pc/default/images/img-404.jpg"
  imgNotFound = 'https://ih1.redbubble.net/image.1861329778.2941/tst,small,845x845-pad,1000x1000,f8f8f8.jpg';
  showPagination: boolean = true;
  protected selected: Cosmetico | null = null;

  ngOnInit(): void {
    this.loadCosmetics();
  }

  protected loadCosmetics() {
    this.cosmeticService.getPaginationCosmetico(this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.cosmeticResponse = value;
        this.cosmeticList.set(value.cosmeticos.cosmeticos);
        console.log(value)
        this.showPagination = true;
      },
      error: error => console.error(error)
    })
  }

  protected pageChange(event: number) {
    this.loadCosmetics()
  }

  protected searchCosmeticos() {
    if (this.search() === '') {
      this.loadCosmetics();
    } else {
      this.showPagination = false;
      this.cosmeticService.getCosmeticoByName(this.search()).subscribe({
        next: value => this.cosmeticList.set(value),
        error: error => console.error(error)
      })
    }
  }

  removeCosmetico(cosmetico: Cosmetico) {
    if (cosmetico._id) {
      this.cosmeticService.deleteCosmetico(cosmetico._id).subscribe({
        next: response => {
          this.showDanger(response.message)
          this.loadCosmetics();
        },
        error: err => console.error(err)
      })
    }
  }

  showDanger(message: string) {
    this.toastService.show({message, classname: 'bg-danger text-light', delay: 3000});
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }


  protected modalCosmetic(cosmetico?: Cosmetico) {
    const modalRef = this.modalService.open(CosmeticEdit);
    modalRef.componentInstance.editar = false;
    if (cosmetico) {
      modalRef.componentInstance.editar = true;
      modalRef.componentInstance.cosmetico = cosmetico;
    }
    modalRef.result.then(() => {
      this.loadCosmetics()
    }).catch(error => {
      console.error(error)
      this.loadCosmetics()
    });
  }

}
