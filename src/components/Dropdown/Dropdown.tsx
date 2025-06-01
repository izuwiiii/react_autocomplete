import classNames from 'classnames';
import { Person } from '../../types/Person';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

interface DropdownProps {
  isDropdownActive: boolean;
  setIsDropdownActive: (value: boolean) => void;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  field: React.RefObject<HTMLInputElement>;
  query: string;
  filteredPeople: Person[];
  onSelected: (person: Person) => void;
  setIsChanged: (value: boolean) => void;
  delay: number;
  setAppliedQuery: React.Dispatch<React.SetStateAction<string>>;
  applyQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isDropdownActive,
  setIsDropdownActive,
  setQuery,
  field,
  query,
  filteredPeople,
  onSelected,
  setIsChanged,
  applyQuery,
  delay,
  setAppliedQuery,
  handleQueryChange,
}) => {
  return (
    <div className={classNames('dropdown', { 'is-active': isDropdownActive })}>
      <div className="dropdown-trigger">
        <input
          type="text"
          placeholder="Enter a part of the name"
          className="input"
          data-cy="search-input"
          onFocus={() => setIsDropdownActive(true)}
          ref={field}
          value={query}
          onChange={e => {
            handleQueryChange(e);
            setIsChanged(true);
          }}
        />
      </div>
      {filteredPeople.length > 0 && (
        <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
          <div className="dropdown-content">
            {filteredPeople.map(person => {
              return (
                <div
                  key={person.slug}
                  className="dropdown-item"
                  data-cy="suggestion-item"
                  onClick={() => {
                    onSelected(person);
                    setIsChanged(false);
                  }}
                >
                  <p
                    className={classNames({
                      'has-text-link': person.sex === 'm',
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
