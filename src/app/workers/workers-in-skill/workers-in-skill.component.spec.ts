import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute} from '@angular/router';

import { WorkersInSkillComponent } from './workers-in-skill.component';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from '../workers-routing.module';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { LookupsService } from '../../lookups/lookups.service';
import { ActivatedRouteStub, LookupsServiceSpy, WorkerServiceSpy } from '../../shared/testing';
import { WorkersService } from '../workers.service';

describe('WorkersInSkillComponent', () => {
  let component: WorkersInSkillComponent;
  let fixture: ComponentFixture<WorkersInSkillComponent>;

  beforeEach(waitForAsync((() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersInSkillComponent ],
      imports: [
        // ... whatever other module you have
        CommonModule,
        WorkersRoutingModule,
        MenuModule,
        CardModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToggleButtonModule,
        FormsModule,
        DialogModule
      ],
      providers:
      [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        { provide: LookupsService, useClass: LookupsServiceSpy },
        { provide: WorkersService, useClass: WorkerServiceSpy }
      ]
    })
    .compileComponents();
  })));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersInSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  
  it('should display workers', () => {    
    expect(component.workers.length).toEqual(1);
  });
});
