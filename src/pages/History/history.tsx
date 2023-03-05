import './history.scss';
import { queryApi } from '../../redux/query';
import { useAppSelector } from '../../hooks/hook';
import { getCurrentUser } from '../../redux/selectors';
import { Spinner } from '../../components/Preloader/Spinner/Spinner';
import { NavLink } from 'react-router-dom';

const History = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, isFetching } = queryApi.useGetUserQuery(currentUser.id);
  console.log(data);

  if (data?.history.length === 0) {
    return (
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Empty</h1>
    );
  }

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      {data &&
        Object.entries(data.history).map((el: any) => {
          return (
            <div className="history__item">
              <div className="history__item-date">{el[0]}</div>
              <div>
                {el[1].item.map((item: any) => (
                  <div className="history__item-info">
                    <NavLink to={`/shop/${item.id}`}>
                      <img src={item.img} alt="item" />
                    </NavLink>
                    <div>
                      <span>{item.title}</span>
                      <span>Size: {item.size}</span>
                      <span>Count: {item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="history__item-price">${el[1].totalPrice}</div>
            </div>
          );
        })}
    </div>
  );
};

export default History;
