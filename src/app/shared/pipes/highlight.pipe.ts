import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  public transform(value: string, search: string): string {
    if (!value || !search) {
      return value;
    }
    const regex = new RegExp(`(${search})`, 'gi');
    return value.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
}
