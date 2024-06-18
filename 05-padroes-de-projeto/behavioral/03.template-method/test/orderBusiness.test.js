import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import Order from "../src/entities/order";
import OrderBusiness from "../src/business/orderBusiness";

describe('Test suite for Template Method design pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe('#OrderBusiness', () => {
        test('execution Order Business without Template Method', () => {
            const order = new Order({
                customerId: '001',
                amount: 100,
                products: [{ description: 'ferrari' }]
            });

            const orderBusiness = new OrderBusiness();
            // todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução
            // se algum es quecer de chamar a fun;cao de validaçao pode querbrar todo o sistema
            const isValid = orderBusiness._validateRequiredFields(order);
            expect(isValid).toBeTruthy();

            const result = orderBusiness._create(order);
            expect(result).toBeTruthy();
        })
        test('execution Order Business with Template Method', () => {
            const order = new Order({
                customerId: '001',
                amount: 100,
                products: [{ description: 'ferrari' }]
            });

            const orderBusiness = new OrderBusiness();
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            );
            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            );
            // com template method, a sequencia de passos é sempre executada
            // e evita replicação de código
            const result = orderBusiness.create(order);
            expect(result).toBeTruthy();
            expect(calledValidationFn).toHaveBeenCalled();
            expect(calledCreateFn).toHaveBeenCalled();
        })
    })
})