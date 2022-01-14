import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostServiceService } from 'src/app/services/post-service.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  userId: number;
  expandedElement: Post | null;
  columnsToDisplay = ['id', 'title', 'more'];
  public dataSource = new MatTableDataSource<Post>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postService: PostServiceService
  ) {}

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      let id = parseInt(params['id']);
      this.userId = id;
      this.getPosts(this.userId);
    });
  }
 
  getPosts(id: number) {
    this._postService.getPosts(id).subscribe((data: Post[]) => {
      this.dataSource.data = data as Post[];
    });
  }
}
