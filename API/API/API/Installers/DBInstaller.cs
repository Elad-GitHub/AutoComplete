using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Installers
{
    public class DBInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CityContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("AutoCompleteDatabase"));
            });
        }
    }
}
