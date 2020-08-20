using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace CustomReports.Data_Access
{
    public class CustomerRepository : IRepository<Customer>
    {
        private readonly ReportsDbContext dbContext;
        public CustomerRepository()
        {
            dbContext = new ReportsDbContext();
        }
        public void Add(Customer entity)
        {
            dbContext.Customers.Add(entity);
            dbContext.SaveChanges();
        }

        public Customer Get(int id)
        {
            return dbContext.Customers.FirstOrDefault(c=>c.Id==id);
        }

        public IEnumerable<Customer> GetAll()
        {
            return dbContext.Customers.ToList();
        }

        public void Remove(Customer entity)
        {
            dbContext.Customers.Remove(entity);
            dbContext.SaveChanges();
        }

        public void Update(Customer entity)
        {
            dbContext.Customers.AddOrUpdate(entity);
            dbContext.SaveChanges();
        }
    }
}