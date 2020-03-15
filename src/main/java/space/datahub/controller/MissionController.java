package space.datahub.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import space.datahub.domain.Mission;
import space.datahub.repo.MissionRepo;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/mission")
public class MissionController {
    private final MissionRepo missionRepo;

    @Autowired
    public MissionController(MissionRepo missionRepo) {
        this.missionRepo = missionRepo;
    }

    @GetMapping
    public List<Mission> list(){
        return missionRepo.findAll();
    }

    @GetMapping("{id}")
    public Mission getOne(@PathVariable("id") Mission mission){
        return mission;
    }

    @PostMapping
    public Mission create(@Valid @RequestBody Mission mission){
        return missionRepo.save(mission);
    }

    @PutMapping("{id}")
    public Mission update(@PathVariable("id") Mission missionFromDb, @RequestBody Mission mission){
        BeanUtils.copyProperties(mission, missionFromDb, "id");
        return missionRepo.save(missionFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Mission mission){
        missionRepo.delete(mission);
    }
}
