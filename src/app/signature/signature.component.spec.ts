import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignatureComponent } from './signature.component';

describe('SignatureComponent', () => {
	let component: SignatureComponent;
	let fixture: ComponentFixture<SignatureComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SignatureComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignatureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
