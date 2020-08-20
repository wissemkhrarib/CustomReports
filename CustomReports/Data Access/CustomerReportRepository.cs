using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace CustomReports.Data_Access
{
    public class CustomerReportRepository : IRepository<CustomerReport>
    {
        private readonly ReportsDbContext dbContext;
        public CustomerReportRepository()
        {
            dbContext = new ReportsDbContext();
        }
        public void Add(CustomerReport entity)
        {
            dbContext.CustomerReports.Add(entity);
            dbContext.SaveChanges();
        }

        public CustomerReport Get(int id)
        {
            return dbContext.CustomerReports.FirstOrDefault(cr => cr.Id == id);
        }

        public IEnumerable<CustomerReport> GetAll()
        {
            return dbContext.CustomerReports.ToList();
        }

        public void Remove(CustomerReport entity)
        {
            dbContext.CustomerReports.Remove(entity);
            dbContext.SaveChanges();
        }

        public void Update(CustomerReport entity)
        {
            dbContext.CustomerReports.AddOrUpdate(entity);
            dbContext.SaveChanges();
        }
        public IEnumerable<CustomerReport> GetByReport(Report report)
        {
            return dbContext.CustomerReports.Where(cr => cr.Report == report).ToList();
        }
        public IEnumerable<CustomerReport> GetByCustomer(Customer customer)
        {
            return dbContext.CustomerReports.Where(cr => cr.Customer == customer).ToList();
        }
    }
}