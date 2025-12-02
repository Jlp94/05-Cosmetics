import {Component, inject, Input, OnInit} from '@angular/core';
import {Cosmetico} from '../../../common/interfaces';
import {CosmeticService} from '../../../services/cosmetic-service';
import {ToastService} from '../../../services/toast-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormValidators} from '../../../validators/FormValidators';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-cosmetic-edit',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './cosmetic-edit.html',
  styleUrl: './cosmetic-edit.scss',
})
export class CosmeticEdit implements OnInit {
  @Input({required: true}) cosmetico!: Cosmetico;
  @Input({required: true}) editar!: boolean;

  imgNotFound = 'https://ih1.redbubble.net/image.1861329778.2941/tst,small,845x845-pad,1000x1000,f8f8f8.jpg';

  activeModal: NgbActiveModal = inject(NgbActiveModal);
  private readonly cosmeticService: CosmeticService = inject(CosmeticService);
  protected readonly toastService: ToastService = inject(ToastService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);


  formCosmetic: FormGroup = this.formBuilder.group({
    _id: [''], // strings
    name: ['', [Validators.required,
      FormValidators.notOnlyWhiteSpace,
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace,
      FormValidators.forbiddenNames(['sex', 'drug','droga']),
      Validators.maxLength(200),
      Validators.maxLength(200)]], // strings
    image: ['', [Validators.required]], // strings
    type: ['', [Validators.required,
      FormValidators.notOnlyWhiteSpace,
      FormValidators.forbiddenNames(['sex', 'drug','droga']),
      Validators.minLength(2),
      Validators.maxLength(200),
      Validators.maxLength(200)]], // strings
    brand: ['', [Validators.required,
      FormValidators.notOnlyWhiteSpace,
      FormValidators.forbiddenNames(['sex', 'drug','droga']),
      Validators.minLength(2),
      Validators.maxLength(200),
      Validators.maxLength(200)]], // strings

    price: [0, [Validators.required,
      Validators.min(0)]], // number

  })

  // GETTERS
  get name(): any {
    return this.formCosmetic.get('name')
  }

  get type(): any {
    return this.formCosmetic.get('type')
  }

  get image(): any {
    return this.formCosmetic.get('image')
  }

  get brand(): any {
    return this.formCosmetic.get('brand')
  }

  get price(): any {
    return this.formCosmetic.get('price')
  }


  onSubmit() {
    if (this.editar) {
      this.cosmeticService.patchCosmetico(this.formCosmetic.getRawValue()).subscribe({
        next: response => {
          this.showValid(response.message)
          console.log(response.message);
          this.activeModal.close();
        },
        error: err => console.error(err)
      })
    } else {
      this.cosmeticService.postCosmetico(this.formCosmetic.value).subscribe({
        next: response => {
          this.showValid(response.message)
          console.log(response.message);
          this.activeModal.close();
        },
        error: err => console.error(err)
      })
    }
  }

  ngOnInit() {
    if (this.editar) {
      this.formCosmetic.setValue(this.cosmetico)
    } else {
      this.formCosmetic.reset()
    }
  }

  showValid(message: string) {
    this.toastService.show({message, classname: 'bg-success text-dark', delay: 3000});
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }


}
