import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConsumptionComponent } from './pages/consumption/consumption.component';
import { ChatComponent } from './pages/chat/chat.component';
import { EnergyComponent } from './energy/energy.component';
import { RewardComponent } from './pages/reward/reward.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'consumption', component: ConsumptionComponent},
    {path: 'reward', component: RewardComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'energy', component: EnergyComponent}
];
