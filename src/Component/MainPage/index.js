import React, { useEffect, useState } from 'react'
import { pink } from '@mui/material/colors'
import Radio from '@mui/material/Radio'
import ReactSelect from 'react-select'
import './style.scss'
import { schemaDropDownData } from '../../common/constants'

function MainPage() {
  const [selectedValue, setSelectedValue] = useState('a')
  const [selectedSchema, setSelectedSchema] = useState({ label: '', value: '' })
  const [schemaList, setSchemaList] = useState([])
  const [dropDownData, setDropDownData] = useState(schemaDropDownData)
  const [segmentName, setSegmentName] = useState('')

  useEffect(() => {
    if (schemaList.length > 0) {
      let arr = []

      schemaDropDownData.map((item) => {
        let index = schemaList.findIndex((data) => data.value === item.value)
        if (index === -1) {
          arr.push(item)
        }
      })

      setDropDownData(arr)
    } else {
      setDropDownData(schemaDropDownData)
    }
  }, [schemaList])

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  })

  const addSchemaToList = () => {
    let copiedData = [...schemaList]

    let index = copiedData.findIndex(
      (item) => item.value === selectedSchema.value,
    )
    if (index === -1) {
      copiedData.push(selectedSchema)
    }
    setSchemaList(copiedData)
    setSelectedSchema({ label: '', value: '' })
  }

  const validateSelectedSchema = () => {
    switch (true) {
      case !selectedSchema.label:
        alert('Please select schema to add!')
        return false

      default:
        return true
    }
  }

  const validate = () => {
    switch (true) {
      case !segmentName:
        alert('Segment Name is required!')
        return false
      case schemaList.length === 0:
        alert('Schema is required!')
        return false
      default:
        return true
    }
  }

  const changeSchemaInList = (item, itemToChange) => {
    let arr = [...schemaList]
    var indexOfItem = arr.findIndex((i) => i.value === item.value)

    arr.splice(indexOfItem, 1, itemToChange)

    setSchemaList(arr)
  }

  const onSave = () => {
    if (validate()) {
      let arr = []
      schemaList.map((item) => {
        let obj = new Object()
        obj[item.value] = item.label
        arr.push(obj)
      })

      let data = {
        segment_name: segmentName,
        schema: arr,
      }
      console.log(JSON.stringify(data), 'Data to submit')

      alert('Success')
    }
  }
  return (
    <div>
      <div className=" mx-5 my-3">
        <button
          className="btn btn-secondary border-none  save-segment"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <label className="segment-style">Save Segment</label>
        </button>

        <div
          key={'OFF_CANVAS'}
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            <h5 className="mx-3 pt-1">Saving Segment</h5>
          </div>
          <div className="offcanvas-body pt-5 ">
            <label className="segment-name">
              Enter The Name Of The Segment
            </label>
            <input
              type="text"
              className="segment-placeholder mt-3"
              name="Name Of Segment"
              placeholder="Name of Segment"
              value={segmentName}
              onChange={(e) => {
                setSegmentName(e.target.value)
              }}
            />
            <div>
              <label className="build-query my-3">
                To save your segment, you need to add the schemas <br /> to
                build the query.
              </label>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <label>
                    <Radio {...controlProps('c')} color="success" />- User
                    Traits
                  </label>
                  <label className="mx-3">
                    <Radio
                      {...controlProps('e')}
                      sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}
                    />{' '}
                    - Group Traits
                  </label>
                </div>
              </div>

              {Boolean(schemaList) &&
                schemaList?.length > 0 &&
                schemaList.map((item) => (
                  <div className="my-3">
                    <ReactSelect
                      key={`${item.label.toUpperCase()}_SCHEMA`}
                      placeholder="select"
                      className="reactSelect_alignment"
                      options={dropDownData.filter(
                        (datas) => datas.value !== item.value,
                      )}
                      value={item}
                      onChange={(e) => {
                        changeSchemaInList(item, e)
                      }}
                    />
                  </div>
                ))}

              <div className="my-3">
                <ReactSelect
                  key={`ADD_SCHEMA`}
                  placeholder="Add Scheme To The Segment"
                  className="reactSelect_alignment"
                  options={dropDownData}
                  value={Boolean(selectedSchema.label) ? selectedSchema : ''}
                  onChange={(e) => {
                    setSelectedSchema(e)
                  }}
                />
              </div>

              {Boolean(selectedSchema) && (
                <div className="my-3">
                  <label
                    onClick={() => {
                      if (validateSelectedSchema()) {
                        addSchemaToList()
                      }
                    }}
                    className="scheme-decoration"
                  >
                    <>+</>
                    <label className="addScheme-segment mx-2">
                      Add new Scheme
                    </label>
                  </label>
                </div>
              )}
            </div>
            <div className="offcanvas-footer">
              <div className="">
                <button
                  onClick={() => {
                    onSave()
                  }}
                  className="offcanvas-btton"
                  key={'SAVE_SCHEMA'}
                >
                  Save The Segment
                </button>
                <button
                  key={'CLOSE_BTN'}
                  onClick={() => {}}
                  className="offcanvas-1btton mx-3"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
