﻿import { inject, Injectable } from "@angular/core";
import { Customer } from "@venusta/portal/customer/models";
import { map, Observable, of, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { filterDefined } from "@venusta/shared/utils";

@Injectable()
export class CustomerService {
  private readonly http = inject(HttpClient);

  getAll(query: string | null = null): Observable<Customer[]> {
    return this.http.get<Customer[]>('./assets/data/customers.json')
      .pipe(
        filterDefined,
        map(customers => query ? customers.filter(customer => customer.email.toLowerCase().includes(query.toLowerCase()) || customer.firstName.toLowerCase().includes(query.toLowerCase()) || customer.lastName.toLowerCase().includes(query.toLowerCase())) : customers)
      );
  }

  get(customerId: number): Observable<Customer> {
    return this.http.get<Customer[]>('./assets/data/customers.json').pipe(filterDefined, map(customers => {
      const customer = customers.find(customer => customer.id === customerId);

      if(!customer){
        throw throwError(() => new Error(`Could not retrieve customer. No customer found with id: ${customerId}`));
      }

      return customer;
    }));
  }

  put(customer: Customer): Observable<Customer> {
    return of(customer);
  }

  post(customer: Omit<Customer, 'id'>): Observable<Customer> {
    console.log('posting customer', customer);

    return of({ ...customer, id: 1 } as Customer);
  }
}