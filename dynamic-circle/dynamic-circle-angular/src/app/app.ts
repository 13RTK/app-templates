import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<main>
    <label>
      Purple
      <input
        type="checkbox"
        [value]="isPurple()"
        (change)="(handlePurpleChange)"
      />
    </label>

    <label>
      text color
      <select [value]="textColor()" (change)="(handleTextColorChange)">
        <option value="" selected>White</option>
        <option value="text-black">Black</option>
        <option value="text-orange">Orange</option>
      </select>
    </label>

    <label>
      Circle Size
      <input type="number" [value]="size()" (change)="(handleSizeChange)" />
    </label>

    <label>
      Circle Rotate
      <input type="number" [value]="rotate()" (change)="(handleRotateChange)" />
    </label>
    <div
      [class]="['circle', textColor(), { purple: isPurple() }]"
      [style]="circleStyle()"
    >
      Hi!
    </div>
  </main>`,
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-demo';

  isPurple = signal(false);
  handlePurpleChange(event: Event) {
    this.isPurple.set((event.target as HTMLInputElement).checked);
  }

  textColor = signal('');
  handleTextColorChange(event: Event) {
    this.textColor.set((event.target as HTMLInputElement).value);
  }

  size = signal(150);
  handleSizeChange(event: Event) {
    this.size.set(Number((event.target as HTMLInputElement).value));
  }

  rotate = signal(0);
  handleRotateChange(event: Event) {
    this.rotate.set(Number((event.target as HTMLInputElement).value));
  }

  circleStyle = computed(() => {
    return {
      width: `${this.size()}px`,
      height: `${this.size()}px`,
      transform: `rotate(${this.rotate()}deg)`,
    };
  });
}
