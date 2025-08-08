import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'src/app/shared/models/subscription.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id'));

    this.userService.getUserById(userId).subscribe((user: User) => {
      this.profileForm.patchValue({
        username: user.username,
        email: user.email,
      });
    });

    this.subscriptionService.getUserSubscriptions(userId).subscribe((subs) => {
      this.subscriptions = subs;
    });
  }

  // saveProfile(): void {
  //   if (this.profileForm.valid) {
  //     const updatedUser = this.profileForm.value;
  //     this.userService.updateUser(updatedUser).subscribe(() => {
  //       alert('Profile updated successfully!');
  //     });
  //   }
  // }

  // unsubscribe(topicId: number): void {
  //   const userId = Number(localStorage.getItem('user_id'));
  //   this.userService.unsubscribe(userId, topicId).subscribe(() => {
  //     this.subscriptions = this.subscriptions.filter(sub => sub.topic.id !== topicId);
  //   });
  // }
}
