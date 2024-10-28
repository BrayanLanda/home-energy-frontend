import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-energy-tips-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './energy-tips-modal.component.html',
  styleUrl: './energy-tips-modal.component.css'
})
export class EnergyTipsModalComponent implements OnInit, OnDestroy{
  @ViewChild('energyTipsModal') modalContent!: TemplateRef<any>;

  tips: string[] = [
    "Apaga las luces al salir de una habitación.",
    "Utiliza bombillas de bajo consumo o LED.",
    "Desenchufa los dispositivos cuando no los estés utilizando.",
    "Reduce la temperatura de la calefacción en invierno.",
    "Usa la lavadora con agua fría para reducir el consumo.",
    "Aprovecha la luz natural tanto como sea posible.",
    "Reemplaza electrodomésticos viejos por modelos eficientes.",
    "Utiliza el modo de ahorro de energía en tus dispositivos.",
    "Apaga la computadora si no la usarás por un tiempo prolongado.",
    "Evita cargar el teléfono durante toda la noche.",
    "Usa cortinas o persianas para mantener la casa fresca en verano.",
    "Descongela el refrigerador regularmente para mejorar su eficiencia.",
    "Mantén los electrodomésticos limpios para que funcionen mejor.",
    "Cierra bien las puertas y ventanas cuando la calefacción o el aire acondicionado estén encendidos.",
    "Compra electrodomésticos con clasificación energética A+ o superior.",
    "Ajusta el brillo de las pantallas y dispositivos electrónicos.",
    "Utiliza regletas para desconectar varios dispositivos a la vez.",
    "Cocina con ollas de presión para ahorrar gas o electricidad.",
    "Revisa el aislamiento térmico de tu casa.",
    "Instala paneles solares si es posible para usar energía renovable.",
    "Seca la ropa al aire libre en lugar de usar la secadora.",
    "Usa la plancha en lotes grandes para evitar encenderla varias veces.",
    "Evita el uso excesivo del microondas y del horno eléctrico.",
    "Lava platos y ropa con cargas completas.",
    "Reduce el uso del calentador de agua manteniéndolo a una temperatura moderada."
  ];
 
   
  currentTip: string = "";
  tipInterval: any;
  isBrowser: boolean;

  constructor(
    public modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Solo ejecutar en el navegador
      setTimeout(() => {
        this.showRandomTip();
        this.tipInterval = setInterval(() => {
          this.showRandomTip();
        }, 500000);
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.tipInterval) {
      clearInterval(this.tipInterval);
    }
  }

  showRandomTip() {
    if (this.isBrowser) {
      this.currentTip = this.tips[Math.floor(Math.random() * this.tips.length)];
      try {
        this.modalService.open(this.modalContent, {
          centered: true,
          backdrop: true,
          keyboard: true,
          size: 'md',
          windowClass: 'energy-tips-modal'
        });
      } catch (error) {
        console.error('Error al abrir el modal:', error);
      }
    }
  }
}
