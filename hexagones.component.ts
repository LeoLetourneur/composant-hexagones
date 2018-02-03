import { Component, EventEmitter, Input, Output } from '@angular/core';

const couleurs = ["#0086AC", "#79B51C", "#691872", "#0C3F72", "#F8AE00", "#582900", "#5EB4E1"];
const posX = [45, 135, 0, 90, 180, 45, 135];
const posY = [0, 0, 79, 79, 79, 158, 158];

@Component({
  selector: 'hexagones',
  templateUrl: './hexagones.component.html',
  styleUrls: ['./hexagones.component.scss']
})
export class HexagonesComponent {

  @Input() clickable : any[];
  @Input() saved : any[];
  @Input() themes : any[];
  @Input() displayProgress : boolean;
  @Output() themeClicked = new EventEmitter();
  selected : any;
  progress : number;
  
  constructor() {
    this.selected = null;
  }

  ngOnChanges(changes) {
    
    if(this.themes == null) return;

    setTimeout(() => {
      let i = 0;
      let total = 0;
      this.themes.forEach(theme => {
        theme.nom = this.capitalizeName(theme.libelle);
        theme.x = posX[i]; 
        theme.y = posY[i];
        theme.couleur = couleurs[i];
        total += this.verifyThemeComplet(theme);
        i++;

        if(theme.selected) {
          theme.selected = null;
          this.clickOnTheme(theme);
        }
      });
      this.progress = Math.floor(total/i);
    }, 100);
  }

  verifyThemeComplet(theme):number {
    let i = 0;
    let total = theme.details.length;
    theme.complet = true;
    theme.details.forEach(detail => {
      if(detail.statut == null) {
        total--;
        theme.complet = false;
      }
      i++;
    });
    return total/i*100;
  }

  capitalizeName(name) {
    return name;
    //return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  clickOnTheme(theme) {
    if(!this.clickable) return;
    this.selected = theme.code;
    this.themeClicked.emit(theme);
  }
}
