import css from "./EventsBlock.module.css";

const EventsBlock = () => {
  return (
    <div className={css.container}>
      <h3>There are currently no upcoming events</h3>
    </div>
  );
};

export default EventsBlock;
