import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillChart } from './skill-chart';

describe('SkillChart', () => {
  let component: SkillChart;
  let fixture: ComponentFixture<SkillChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillChart],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
