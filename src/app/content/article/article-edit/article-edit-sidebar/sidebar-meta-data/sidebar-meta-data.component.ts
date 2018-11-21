import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUploaderConfig } from '../../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../../shared/interfaces/media/uploader-options.interface';
import { IArticle } from '../../../../../shared/interfaces/article.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'sidebar-meta-data',
  templateUrl: './sidebar-meta-data.component.html',
  styleUrls: ['./sidebar-meta-data.component.scss']
})
export class SidebarMetaDataComponent implements OnInit, OnChanges {

  @Input() article: IArticle;

  @Output() uploadCompleted: EventEmitter<string> = new EventEmitter<string>(false);
  @Output() changeArticle: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    showHeader: false
  };

  public metaUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'meta'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public facebookUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'facebook'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public twitterUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'twitter'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public instagramUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'instagram'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      meta: this.initMetaData()
    });

    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      this.changeArticle.emit(changes);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.article.currentValue.id) {
      this.facebookUploaderOptions.itemId
        = this.metaUploaderOptions.itemId
        = this.instagramUploaderOptions.itemId
        = this.twitterUploaderOptions.itemId
        = changes.article.currentValue.id;
    }
  }

  public step = 0;

  setStep(index: number) {
    this.step = index;
  }

  initMetaData(): FormGroup {
    return this.fb.group({
      main: this.fb.group({
        title: this.article.meta && this.article.meta.main ? this.article.meta.main.title : '',
        description: this.article.meta && this.article.meta.main ? this.article.meta.main.description : '',
      }),
      facebook: this.fb.group({
        title: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.title : '',
        description: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.description : '',
        scheduled: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.scheduled : false
      }),
      twitter: this.fb.group({
        title: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.title : '',
        description: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.description : '',
        scheduled: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.scheduled : false
      })
    });
  }

}
