import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
list: Employee[]
  constructor(private service: EmployeeService, private firestore: AngularFirestore, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(actionArr=>{
      this.list=actionArr.map(item=>{
        return {
          id: item.payload.doc.id,
          ...<Employee>item.payload.doc.data() }
      })
    });
  }

  onEdit(emp: Employee){
    this.service.formData=Object.assign({}, emp);
  }
  onDelete(id: string){
    if(confirm("Sure to Delete"))
    {
    this.firestore.collection('employees').doc(id).delete()
    this.toaster.warning('Employee deleted successfully', 'EMPLOYEE REGISTER')
  }
  }
}
