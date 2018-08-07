import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { MatSelectionList } from '@angular/material';
import { ILocationFilter } from '../../../../shared/interfaces/location/location-filter.interface';
import { IMarker } from '../../../../shared/interfaces/marker.interface';
import { debounceTime } from 'rxjs/internal/operators';

@Component({
  selector: 'location-map-filter',
  templateUrl: './location-map-filter.component.html',
  styleUrls: ['./location-map-filter.component.scss']
})
export class LocationMapFilterComponent implements OnInit, AfterViewInit {

  @Input() categories: ICategory[];
  @Input() markers: IMarker[];

  @Output() changeFilters: EventEmitter<ILocationFilter> = new EventEmitter<ILocationFilter>(false);
  @Output() resetMarkers: EventEmitter<void> = new EventEmitter<void>(false);

  @ViewChild(MatSelectionList) categorySelect: MatSelectionList;

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      categoriesFilter: ['', [Validators.required]],
      titleFilter: ''
    });

    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((changes: {
      titleFilter: string,
      categoriesFilter: string[]
    }) => {
      this.changeFilters.emit(changes);
    });
  }

  ngAfterViewInit() {
    this.setOptions2Selected();
  }

  resetFilters() {
    this.form.get('titleFilter').setValue('');
    this.setOptions2Selected();
  }

  setOptions2Selected() {
    this.categorySelect.selectAll();
    this.cdRef.detectChanges();
  }
}
