import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../../../../shared/interfaces/user/user.interface';
import { IUploaderConfig } from '../../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../../shared/interfaces/media/uploader-options.interface';
import { IArticle } from '../../../../../shared/interfaces/article.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'sidebar-main-data',
  templateUrl: './sidebar-main-data.component.html',
  styleUrls: ['./sidebar-main-data.component.scss']
})
export class SidebarMainDataComponent implements OnInit {

  @Input() article: IArticle;
  @Input() users: IUser[];

  @Output() uploadCompleted: EventEmitter<string> = new EventEmitter<string>(false);
  @Output() changeArticle: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);

  public host = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  public form: FormGroup;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    showHeader: false
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'cover'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      excerpt: this.article.excerpt,
      subTitle: this.article.subTitle,
      postURL: this.article.postURL,
      articleDate: this.article.articleDate.seconds * 1000,
      isFeaturedPost: this.article.isFeaturedPost,
      creation: this.initCreation(),
      assignedTags: [this.article.assignedTags],
    });

    this.uploaderOptions.itemId = this.article.id;

    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      console.log(changes.articleDate);
      changes.articleDate = changes.articleDate ? changes.articleDate.toDate() : new Date();
      this.changeArticle.emit(changes);
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      by: this.article.creation.by,
      at: this.article.creation.at
    });
  }

}
