using CustomReports.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace CustomReports.Data_Access
{
    public class BlocRepository : IRepository<Bloc>
    {
        private readonly ReportsDbContext dbContext;
        public BlocRepository()
        {
            dbContext = new ReportsDbContext();
        }
        public void Add(Bloc entity)
        {
            dbContext.Blocs.Add(entity);
            dbContext.SaveChanges();
        }
        public int AddAndGetId(Bloc entity)
        {
            dbContext.Blocs.Add(entity);
            dbContext.SaveChanges();
            return entity.Id;
        }

        public Bloc Get(int id)
        {
            return dbContext.Blocs.FirstOrDefault(b => b.Id == id);
        }
        public Bloc GetLastBloc(int reportId)
        {
            return dbContext.Blocs
                .Where(b => b.ReportId == reportId)
                .OrderByDescending(b => b.H)
                .ThenByDescending(b => b.Y)
                .FirstOrDefault();
                
        }
        public IEnumerable<Bloc> GetBlocsByReport(Report report)
        {
            return dbContext.Blocs.Where(b => b.Report == report);
        }

        public IEnumerable<Bloc> GetAll()
        {
            return dbContext.Blocs.ToList();
        }

        public void Remove(Bloc entity)
        {
            dbContext.Blocs.Remove(entity);
            dbContext.SaveChanges();
        }

        public void Update(Bloc entity)
        {
            dbContext.Blocs.AddOrUpdate(entity);
            dbContext.SaveChanges();
        }
    }
}