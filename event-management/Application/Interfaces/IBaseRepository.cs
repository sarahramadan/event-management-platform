using System.Linq;
using System.Threading.Tasks;

namespace event_management.Application.Interfaces
{
    public interface IBaseRepository<TEntity, TKey>
        where TEntity : class
    {
        Task<TEntity?> GetByIdAsync(TKey id);
        Task AddAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
        IQueryable<TEntity> Query();
    }
}
